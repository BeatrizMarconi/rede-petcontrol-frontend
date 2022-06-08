
import { useEffect, useState } from "react"
import { Box, Button, Center, Flex, HStack, Spacer, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";


export default function Clientes() {

    let tableHead = ["Nome", "Email", "Endereço", "Pets", "Ações"];
    const [clientes, setClientes] = useState();
    const navigate = useNavigate();
    
    const goToAdd = () => navigate('/clientes/cadastrar')

    useEffect(() => {
        api.get('/clientes')
            .then((res) => {
                setClientes(res);
                console.log(res)
            })
            .catch((err) => {
                console.log(`vish algo deu errado no cliente ${err}`)
            })
    }, [])
    
    return (
        <Center>
            <Box w="75%" h="100%">
                <Box fontWeight="bold" fontSize="30px" mb={61} mt={10} pl={4}>Todos os Clientes</Box>
                <Flex>
                    <Spacer />
                    <Button rightIcon={<FaPlus />}
                        colorScheme='teal'
                        variant='outline'
                        mb={8}
                        fontWeight={700}
                        onClick={goToAdd}>
                        Adicionar Novo
                    </Button>
                </Flex>
                <Table size='md' fontSize="14px">
                    <Thead>
                        <Tr>
                            {tableHead.map((listaHead, index) => (

                                <Th w="22%" key={index}>{listaHead}</Th>

                            ))}
                        </Tr>
                    </Thead>

                    <Tbody>
                        <Tr>
                            {clientes?.map((listaGlobalTable, index) => (
                                <>
                                    <Td key={index}>{listaGlobalTable.name}</Td>
                                    <Td>{listaGlobalTable.email}</Td>
                                    <Td>Endereço</Td>
                                    <Td>Lolozinho</Td>
                                    <Td >
                                        <HStack>
                                            <Link to={"/clientes/editar/6"}><GrEdit /></Link>
                                            <RiDeleteBin6Line />
                                        </HStack>
                                    </Td>
                                </>
                            ))}
                        </Tr>
                    </Tbody>

                </Table>
            </Box>
        </Center>
    )
}
