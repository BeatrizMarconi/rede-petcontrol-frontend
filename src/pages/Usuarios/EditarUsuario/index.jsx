import { Box, Center} from "@chakra-ui/react";
import { FormUsuarios } from "../../../components/FormUsuarios";

export default function Novo() {
    return (
        <Center>
            <Box w="75%" h="100%">
                <Box fontWeight="bold" fontSize="30px" mb={61} mt={10} pl={4}>Editar Usuário</Box>

                <Box width={400} lineHeight={8}>
                    <FormUsuarios button="Salvar" isNew={true} />
                </Box>
            </Box>
        </Center>
    );
}