import {
  Box,
  Radio,
  useRadio,
} from "@chakra-ui/react";


function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props)
  
    const input = getInputProps()
    const checkbox = getCheckboxProps()
  
    return (
      <Box as='label'>
        <input {...input} />
        <Box
          {...checkbox}
          width={120}
          height={50}
          display='flex'
          borderColor='teal.600'
          cursor='pointer'
          borderWidth='1px'
          borderRadius='md'
          bg='teal.900'
          boxShadow='md'
          alignItems={"center"}
          justifyContent={"center"}
          _checked={{
            bg: 'teal.400',
            color: 'white',
            borderColor: 'teal.100',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          
          px={1}
          py={1}
          fontSize='xs'

        >
          {props.children}
        </Box>
      </Box>
    )
  }


  export default RadioCard;