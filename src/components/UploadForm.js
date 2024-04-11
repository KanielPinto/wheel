// components/UploadForm.js
'use client'
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { InfoIcon } from "lucide-react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip } from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

const UploadForm = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [file, setFile] = useState(null);
  const [tasks, setTasks] = useState([])

  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && user) {
      fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/user-tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "uid": user.id
        }),
      }).then(async res => {
        var res = await res.json()
        setTasks(res['result'])
        console.log(res[0])
      });

    }
  }, [isOpen, isLoading, user])


const handleFileChange = (event) => {
  setFile(event.target.files[0]);
};

const handleSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append('pdf', file);
  formData.append('uid', user.id)

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/upload`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } else {
      console.error('Failed to upload PDF');
    }
  } catch (error) {
    console.error('Error uploading PDF:', error);
  }
};



return (
  <div>

    <Button className='w-full' onPress={onOpen} color="secondary" variant="shadow">
      Upload Statement
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

              <ModalHeader className="flex flex-col gap-1">Upload PDF</ModalHeader>
              <ModalBody>

                <input id="picture" type="file" name="pdf" accept=".pdf" onChange={handleFileChange} className="flex h-10 w-full rounded-md border border-input bg-black px-3 py-2 text-sm text-gray-300 file:border-0 file:bg-transparent file:text-gray-400 file:text-sm file:font-medium"></input>

                <h1>Tasks Status</h1>
                <Table aria-label="Example static collection table">
                  <TableHeader>
                    <TableColumn>FILE</TableColumn>
                    <TableColumn>RESULT</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {tasks && tasks.map((task, index) => (
                      <TableRow key={index}>
                        <TableCell>{task['fileName']}</TableCell>
                        <TableCell>{task['taskResult']['result']}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button type='submit' color="primary" onClick={onClose}>
                  Upload
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

export default UploadForm;
