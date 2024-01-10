import { RiRobot2Line } from 'react-icons/ri';
import { IoFastFoodOutline } from 'react-icons/io5';
import { IoHappyOutline } from 'react-icons/io5';
import { MdOutlineHealthAndSafety } from 'react-icons/md';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { IoHomeOutline } from 'react-icons/io5';
import { GoPeople } from 'react-icons/go';
import { TbMoneybag } from 'react-icons/tb';
import { TbTool } from 'react-icons/tb';

export const validateFullname = (fullname: string): RegExpMatchArray | null => {
    return fullname.match("^[A-Za-zs ']{1,}[.]{0,1}[A-Za-zs]{0,}$");
};

export const validateEmail = (email: string): RegExpMatchArray | null => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePassword = (password: string): RegExpMatchArray | null => {
    return password.match(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
    );
};

export const validateConfirmPassword = (
    password: string,
    confirmPassword?: string
): boolean => {
    return password === confirmPassword;
};

export const categoryIcon = (category: string) => {
    switch (category) {
        case 'tech':
            return (
                <RiRobot2Line
                    size={18}
                    className='mr-1 '
                />
            );
        case 'food':
            return (
                <IoFastFoodOutline
                    size={18}
                    className='mr-1 '
                />
            );
        case 'entertainment':
            return (
                <IoHappyOutline
                    size={18}
                    className='mr-1 '
                />
            );
        case 'health':
            return (
                <MdOutlineHealthAndSafety
                    size={18}
                    className='mr-1 '
                />
            );
        case 'money':
            return (
                <FaRegMoneyBillAlt
                    size={18}
                    className='mr-1 '
                />
            );
        case 'home & garden':
            return (
                <IoHomeOutline
                    size={18}
                    className='mr-1 '
                />
            );
        case 'relationships':
            return (
                <GoPeople
                    size={18}
                    className='mr-1 '
                />
            );
        case 'deals':
            return (
                <TbMoneybag
                    size={18}
                    className='mr-1 '
                />
            );
        case 'hacks':
            return (
                <TbTool
                    size={18}
                    className='mr-1 '
                />
            );
    }
};
