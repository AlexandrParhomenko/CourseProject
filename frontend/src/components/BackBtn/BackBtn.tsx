import {type FC} from 'react';
import {MdArrowBackIos} from "react-icons/md";
import {Button, type ButtonProps} from "antd";

interface Props extends ButtonProps {}

const BackBtn: FC<Props> = ({...props}) => {
    return (
        <Button {...props}>
            <MdArrowBackIos />
            <span>Назад</span>
        </Button>
    );
};

export default BackBtn;