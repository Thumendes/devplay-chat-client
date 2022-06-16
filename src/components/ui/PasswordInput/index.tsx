import {
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface PasswordInputProps extends InputProps {}

const PasswordInput = ({ ...rest }: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow((prev) => !prev);

  return (
    <InputGroup>
      <Input type={show ? "text" : "password"} {...rest} />

      <InputRightElement>
        <IconButton
          size='sm'
          colorScheme='gray'
          aria-label="Toggle Password Visible"
          onClick={toggleShow}
          icon={show ? <FiEyeOff /> : <FiEye />}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;
