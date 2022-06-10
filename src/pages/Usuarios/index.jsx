import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Center, Flex, HStack, Spacer, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import moment from 'moment';
import api from "../../services/api";

export default function Usuarios() {

    const navigate = useNavigate();
    let tableHead = ["Nome", "Usuário", "Perfil", "Data de cadastro", "Ações" ];
    const [usuarios, setUsuarios] = useState([]);
    
    const goToAdd = () => navigate('/usuarios/cadastrar')
    
    useEffect(() => {
        api.get('/users')
            .then((res) => {
                setUsuarios(res.data);
                console.log(res.data)
            })
            .catch((err) => {
                console.log(`vish algo deu errado no usuarios ${err}`)
            })
    }, [])

    return (
        
        <Center>
            <Box w="75%" h="100%">
                <Box fontWeight="bold" fontSize="30px" mb={61} mt={10} pl={4}>Todos os Usuários</Box>

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
                            {usuarios.map((usuario) => (
                                <Tr>
                                    <Td key={usuario.id}>{usuario.name}</Td>
                                    <Td>{usuario.username}</Td>
                                    <Td>{usuario.role.name}</Td>
                                    <Td>{moment(usuario.updated_at).format('DD/MM/YYYY')}</Td>
                                    <Td >
                                        <HStack>
                                            <Link to={`/usuarios/editar/${usuario.id}`}><GrEdit /></Link>
                                            <RiDeleteBin6Line />
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))}                       
                    </Tbody>
                </Table>
            </Box>
        </Center>
        
    );
}