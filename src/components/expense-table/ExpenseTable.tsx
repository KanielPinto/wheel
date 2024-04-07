import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Pagination,
    Selection,
    SortDescriptor
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { SearchIcon } from "./SearchIcon";
import { columns, users } from "./data";
import { capitalize } from "./utils";
import { useUser } from "@clerk/nextjs";
import UploadForm from "../UploadForm";
import AddExpense from "./AddExpense";


const INITIAL_VISIBLE_COLUMNS = ["transaction_id", "beneficiary","date", "deposit_amt", "withdrawal_amt", "mode"];



export default function ExpenseTable() {
    const { user } = useUser();
    const [transactions, setTransactions] = useState<any>([]);
    const [isUserAvailable, setIsUserAvailable] = useState(false);


    type Transaction = typeof transactions;

    useEffect(() => {
        if (user) {
            setIsUserAvailable(true);
        } else {
            setIsUserAvailable(false);
        }
    }, [user]);

    useEffect(() => {
        const fetchTransactions = async () => {
            if (isUserAvailable && user?.id) {
                try {
                    const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+`/transactions/{$user.id}`);
                    const data = await response.json();
                    const flattened = data?.result.map((transaction: { [x: string]: any; Beneficiary: any; Category: any; Date: any; Mode: any; UPI_Handle: any; transaction_id: any; }, index: number) => ({
                        beneficiary: transaction.Beneficiary,
                        category: transaction.Category,
                        date: transaction.Date,
                        depositAmt: transaction["Deposit Amt."],
                        withdrawalAmt: transaction["Withdrawal Amt."],
                        mode: transaction.Mode,
                        upiHandle: transaction.UPI_Handle,
                        transactionId: transaction.transaction_id
                    }));

                    setTransactions(flattened);
                    console.log(flattened);
                } catch (error) {
                    console.error('Error fetching transactions:', error);
                }
            }
        };

        fetchTransactions();


    }, [isUserAvailable, user?.id]);



    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "date",
        direction: "ascending",
    });

    const [page, setPage] = useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredTransactions = [...transactions];

        if (hasSearchFilter) {
            filteredTransactions = filteredTransactions.filter((transaction) =>
                transaction.beneficiary.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        return filteredTransactions.map((transaction) => ({
            transaction_id: transaction.transactionId,
            beneficiary: transaction.beneficiary,
            deposit_amt: transaction.depositAmt,
            category: transaction.category,
            date: transaction.date,
            withdrawal_amt: transaction.withdrawalAmt,
            mode: transaction.mode,
            upi_handle: transaction.upiHandle
        }));
    }, [transactions, filterValue]);
    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: Transaction, b: Transaction) => {
            const first = a[sortDescriptor.column as keyof Transaction] as number;
            const second = b[sortDescriptor.column as keyof Transaction] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((transaction: Transaction, columnKey: React.Key) => {
        const cellValue = transaction[columnKey as keyof Transaction];

        switch (columnKey) {
            case "transaction_id":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                        <p className="text-bold text-tiny capitalize text-default-400">{transaction.transaction_id}</p>
                    </div>
                );
            case "beneficiary":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                        <p className="text-bold text-tiny capitalize text-default-400">{transaction.Beneficiary}</p>
                    </div>
                );
            case "date":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                        <p className="text-bold text-tiny capitalize text-default-400">{transaction.Date}</p>
                    </div>
                );
            case "date":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                        <p className="text-bold text-tiny capitalize text-default-400">{transaction.Date}</p>
                    </div>
                );
            case "deposit_amt":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                        <p className="text-bold text-tiny capitalize text-default-400">{transaction["Deposit Amt."]}</p>
                    </div>
                );
            case "withdrawal_amt":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                        <p className="text-bold text-tiny capitalize text-default-400">{transaction["Withdrawal Amt."]}</p>
                    </div>
                );
            case "mode":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                        <p className="text-bold text-tiny capitalize text-default-400">{transaction.Mode}</p>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by name..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <UploadForm></UploadForm>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <AddExpense></AddExpense>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400">Total {filteredItems.length} Transactions</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">10</option>
                            <option value="10">15</option>
                            <option value="15">25</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        users.length,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="m-auto py-2 md:px-2 flex justify-between items-center w-full">
                <span className="w-[30%] text-small text-default-400 hidden md:block">
                    {selectedKeys === "all"
                        ? "All items selected"
                        : `${selectedKeys.size} of ${filteredItems.length} selected`}
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[382px]",
            }}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No Transactions Found"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.transaction_id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
