// components/UploadForm.js
'use client'
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem } from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { Input } from '@nextui-org/react';
import { IndianRupeeIcon, AtSignIcon } from 'lucide-react';

const AddExpense = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    beneficiary: '',
    transactionDate: '',
    amount: 0,
    transactionType: '',
    mode: '',
    upiHandle: '',
    manual: 1
  });

  const { user } = useUser();


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(JSON.stringify(formData));

    // try {
    //   const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/transactions/${user.id}`, {
    //     method: 'POST',
    //     body: JSON.stringify(formData),
    //   });

    //   if (response.ok) {
    //     // router.push('/success'); // Redirect to a success page
    //   } else {
    //     console.error('Failed to add expense.');
    //   }
    // } catch (error) {
    //   console.error('Error adding expense  :', error);
    // }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
                    name="beneficiary" isRequired />
                  <Input type="date" label="Date" id="transactionDate" onChange={handleInputChange}
                    name="transactionDate" isRequired />
                  <Input type="number" label="Amount" startContent={<IndianRupeeIcon size={16}/>} id="amount" onChange={handleInputChange}
                    name="amount" isRequired />
                  <Select
                    id='transactionType'
                    name='transactionType'
                    label="Transaction Type"
                    className="w-full"
                    onChange={handleInputChange}
                    isRequired
                  >
                    <SelectItem value="deposit">
                      {"Deposit"}
                    </SelectItem>
                    <SelectItem value="withdrawal">
                      {"Withdrawal"}
                    </SelectItem>

                  </Select>
                  <Select
                    id='mode'
                    name='mode'
                    label="Mode"
                    className="w-full"
                    onChange={handleInputChange}
                    isRequired
                  >
                    <SelectItem value="UPI">
                      {"UPI"}
                    </SelectItem>
                    <SelectItem value="IB">
                      {"IB"}
                    </SelectItem>
                    <SelectItem value="POS">
                      {"POS"}
                    </SelectItem>
                    <SelectItem value="NEFT">
                      {"NEFT"}
                    </SelectItem>
                    <SelectItem value="IMPS">
                      {"IMPS"}
                    </SelectItem>
                    <SelectItem value="TPT">
                      {"TPT"}
                    </SelectItem>
                    <SelectItem value="CASH">
                      {"CASH"}
                    </SelectItem>

                  </Select>

                  <Input type="select" id='upiHandle' onChange={handleInputChange}
                    name='upiHandle' startContent={<AtSignIcon size={16}/>} label="UPI-Handle" />


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
