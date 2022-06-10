import { Button, FormControl, FormLabel, HStack, Input, Select, useToast, Spinner, SelectField } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

export function FormUsuarios({ button, isNew }) {

    const { register, handleSubmit, setValue, /*formState: { errors }*/ } = useForm();
    const toast = useToast();
    const [perfis, setPerfis] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [usuario, setUsuario] = useState();
    const navigate = useNavigate();

    useEffect(() => {


        api.get("/roles")
            .then((res) => {
                let rolesOrdenado = res.data.reverse()
                setPerfis(rolesOrdenado)
            })
            .catch(() => {

            })

        if (isNew) {
            api.get(`/users/${id}`)
                .then((res) => {
                    setUsuario(res.data)
                    setValue("name", res.data.name);
                    setValue("username", res.data.username);
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }, [])

    const usuarioRegister = (data) => {

        setLoading(true);
        
        if (isNew) {
            api.put(`/users/${id}`, data)
                .then((res) => {
                    toast({
                        title: 'Usuário atualizado com sucesso!',
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                        position: 'top'
                    })
                    setLoading(false);
                    navigate('/usuarios')
                })
                .catch((err) => {
                    toast({
                        title: `Ops, algo de errado!`,
                        status: 'error',
                        duration: 4000,
                        isClosable: true,
                        position: 'top'
                    })
                    setLoading(false);
                })

        } else {
            api.post("/users", data)
                .then(() => {
                    toast({
                        title: 'Usuário cadastrado com sucesso!',
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                        position: 'top'
                    })
                    setLoading(false);
                })
                .catch((err) => {
                    toast({
                        title: `Usuário ${err.response.data.username}`,
                        status: 'error',
                        duration: 4000,
                        isClosable: true,
                        position: 'top'
                    })
                    setLoading(false);
                })
        }
    }

    return (
        <form onSubmit={handleSubmit(usuarioRegister)}>
            <FormControl id="name" marginBottom={3} isRequired>
                <FormLabel marginBottom={0}>Nome</FormLabel>
                <Input
                    placeholder="Nome do usuario"
                    _placeholder={{ color: 'gray.500' }}
                    type="text"
                    {...register("name", { required: true })} />
            </FormControl>

            <HStack marginBottom={3}>
                <FormControl id="username" isRequired>
                    <FormLabel marginBottom={0}>Usuário</FormLabel>
                    <Input
                        placeholder="userName"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        {...register("username", { required: true })} />
                </FormControl>

                <FormControl id="role_id" isRequired>
                    <FormLabel marginBottom={0}>Perfil</FormLabel>

                    <Select
                        type="text"
                        {...register("role_id", { required: true })}>

                        {perfis.map((perfil) => (
                            <option value={perfil.id}>{perfil.name}</option>
                        ))}
                    </Select>
                </FormControl>
            </HStack>

            <FormControl id="password" isRequired>
                <FormLabel>Senha</FormLabel>
                <Input
                    placeholder="********"
                    type="password"
                    
                    {...register("password", { required: true })} />
            </FormControl>
            

            <Button
                mt={8}
                bg={'#00a9b6'}
                color={'white'}
                _hover={{ bg: '#07727a' }}
                width="100%"
                type="submit"
                disabled={loading}>
                {loading ? <Spinner /> : button}
            </Button>
        </form>
    )
}