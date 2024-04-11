// components/UploadForm.js
'use client'
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem } from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { Input } from '@nextui-org/react';
import { IndianRupeeIcon, AtSignIcon } from 'lucide-react';

const AddExpense = () => {
  const [transactionTypeValue, setTransactionTypeValue] = useState("");
  const [modeValue, setModeValue] = useState("");
  const [dateValue, setDateValue] = useState(Date());

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    Beneficiary: '',
    Date: new Date().toISOString().substring(0,10),
    Amount: 0,
    "Transaction Type": transactionTypeValue,
    Mode: modeValue,
    UPI_Handle: ''
  });

  const { user } = useUser();


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(JSON.stringify(formData));

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/transactions/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Failed to add expense.');
      }
    } catch (error) {
      console.error('Error adding expense  :', error);
    }
  };

  const handleInputChange = (e) => {
    console.log(e);
    var { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTransactionTypeInputChange = (e) => {
    setTransactionTypeValue(e.target.value);
    var { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleDateInputChange = (e) => {
    setDateValue(e.target.value);
    var { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: new Date(value).toISOString().substring(0,10)
    }));
  }

  const handleModeInputChange = (e) => {
    setModeValue(e.target.value);
    var { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <div>

      <Button className='w-full' onPress={onOpen} color="primary" endContent={<PlusIcon />}>
        Add New
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop='blur'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit} encType="multipart/form-data">

                <ModalHeader className="flex flex-col gap-1">Add Transaction</ModalHeader>
                <ModalBody>

                  <Input type="text" label="Beneficiary" id="beneficiary" onChange={handleInputChange}
                    name="Beneficiary" isRequired />
                  <Input type="date" label="Date" id="Date" onChange={handleDateInputChange}
                    name="Date" isRequired />
                  <Input type="number" label="Amount" startContent={<IndianRupeeIcon size={16} />} id="amount" onChange={handleInputChange}
                    name="Amount" isRequired />
                  <Select
                    id='transactionType'
                    name='Transaction Type'
                    label="Transaction Type"
                    className="w-full"
                    onChange={handleTransactionTypeInputChange}
                    isRequired
                    selectedKeys={[transactionTypeValue]}


                  >
                    <SelectItem key={'Deposit'} value="Deposit">
                      {"Deposit"}
                    </SelectItem>
                    <SelectItem key={'Withdrawal'} value="Withdrawal">
                      {"Withdrawal"}
                    </SelectItem>

                  </Select>
                  <Select
                    id='mode'
                    name='Mode'
                    label="Mode"
                    className="w-full"
                    onChange={handleModeInputChange}
                    isRequired
                    selectedKeys={[modeValue]}
                  >
                    <SelectItem key={"UPI"} value="UPI">
                      {"UPI"}
                    </SelectItem>
                    <SelectItem key={"IB"} value="IB">
                      {"IB"}
                    </SelectItem>
                    <SelectItem key={"POS"} value="POS">
                      {"POS"}
                    </SelectItem>
                    <SelectItem key={"NEFT"} value="NEFT">
                      {"NEFT"}
                    </SelectItem>
                    <SelectItem key={"IMPS"} value="IMPS">
                      {"IMPS"}
                    </SelectItem>
                    <SelectItem key={"TPT"} value="TPT">
                      {"TPT"}
                    </SelectItem>
                    <SelectItem key={"CASH"} value="CASH">
                      {"CASH"}
                    </SelectItem>

                  </Select>

                  <Input type="select" id='upiHandle' onChange={handleInputChange}
                    name='UPI_Handle' startContent={<AtSignIcon size={16} />} label="UPI-Handle" />


                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button type='submit' color="primary" onClick={onClose}>
                    Add
                  </Button>
                </ModalFooter>
              </form>

            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddExpense;
