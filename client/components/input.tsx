import React, { useRef } from 'react';

import { FaCheck } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

interface Input {
    type: string;
    placeholder: string;
    value: string;
    value2?: string;
    setter: (val: string) => void;
    error?: string;
    validate?: (
        val: string,
        val2?: string
    ) => RegExpMatchArray | boolean | null;
}

export default function Input(input: Input) {
    const successIcon = useRef<HTMLDivElement>(null);
    const failureIcon = useRef<HTMLDivElement>(null);
    const failureMessage = useRef<HTMLDivElement>(null);

    const toggleFullnameMessage = (mode: string) => {
        if (mode == 'hidden') {
            successIcon.current!.style.display = 'block';
            failureIcon.current!.style.display = 'none';
            failureMessage.current!.style.display = 'none';
        } else {
            successIcon.current!.style.display = 'none';
            failureIcon.current!.style.display = 'block';
            failureMessage.current!.style.display = 'block';
        }
    };

    return (
        <>
            <label
                htmlFor={input.placeholder}
                className='block w-full text-left ml-2 text-gray-500'
            >
                {input.placeholder}
            </label>
            <input
                name={input.placeholder}
                type={input.type}
                placeholder={input.placeholder}
                className='border-solid border-2 bg-transparent rounded-md p-2 my-2 block w-full'
                onChange={(e) => {
                    if (input.type === 'file') {
                        // const reader = new FileReader();
                        // reader.readAsDataURL(e.target.files![0]);
                        // reader.onload = () => {
                        //     console.log(reader.result); // base64 string
                        //     input.setter(reader.result);
                        // };
                        // reader.onerror = (error) => {
                        //     console.log(`Error: ${error}`);
                        // };
                    } else {
                        input.setter(e.target.value);
                        if (input.validate) {
                            if (
                                input.value2
                                    ? input.validate(
                                          e.target.value,
                                          input.value2
                                      )
                                    : input.validate(e.target.value)
                            ) {
                                toggleFullnameMessage('hidden');
                            } else {
                                toggleFullnameMessage('active');
                            }
                        }
                    }
                }}
                onBlur={(e) => {
                    if ((failureMessage.current!.style.display = 'block')) {
                        failureMessage.current!.style.display = 'none';
                    }
                }}
                value={input.value}
            ></input>
            <div
                ref={successIcon}
                className='float-right mr-3 -mt-11 relative z-10 text-green-600 hidden'
            >
                <FaCheck size={25} />
            </div>
            <div
                ref={failureIcon}
                className='float-right mr-2 -mt-12 relative z-10 text-red-600 hidden'
            >
                <RxCross2 size={35} />
            </div>
            <div
                ref={failureMessage}
                className='hidden border-solid border-2 bg-transparent rounded-md p-2 border-red-600 bg-red-300'
            >
                <ul>
                    <li>{input.error}</li>
                </ul>
            </div>
        </>
    );
}
