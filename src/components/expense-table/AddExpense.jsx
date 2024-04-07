// components/UploadForm.js
'use client'
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select } from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { Input } from '@nextui-org/react';

const AddExpense = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [file, setFile] = useState(null);


  const { user } = useUser();


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('uid', user.id)

    try {
      const response = await fetch(process.env.API_BASE_URL + `/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // router.push('/success'); // Redirect to a success page
      } else {
        console.error('Failed to upload PDF');
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
    }
  };

  return (
    <div>

      <Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
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

                  <Input type="text" label="Transaction-ID" id="transactionId" name="transactionId" />
                  <Input type="text" label="Beneficiary" id="beneficiary" name="beneficiary" />
                  <Input type="text" label="Category" id="category" name="category" />
                  <Input type="date" label="Date" id="transactionDate" name="transactionDate" />
                  <Input type="number" label="Deposit-Amount" id="depositAmount" name="depositAmount" />
                  <Input type="number" label="Withdrawal-Amount" id="withdrawalAmount" name="withdrawalAmount" />

                  <select
                    id='investmentHorizon'
                    className='block bg-gray-700 opacity-40 rounded-lg border-0 p-2 text-white shadow-sm sm:text-sm sm:leading-6 w-full'
                  >
                    <option value='UPI'>UPI</option>
                    <option value='IB'>IB</option>
                    <option value='POS'>POS</option>
                    <option value='NEFT'>NEFT</option>
                    <option value='IMPS'>IMPS</option>
                    <option value='TPT'>TPT</option>
                    <option value='CASH'>CASH</option>

                  </select>
                  <Input type="select" label="UPI-Handle" />


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
