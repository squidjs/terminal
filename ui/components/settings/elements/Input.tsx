import React, { FC, ReactElement, useRef } from 'react';

interface Props {

    placeholder: string;
    type?: string;
    value: string;
    setValue: (value: string) => void;
}

const Input: FC<Props> = ({ placeholder, type, value, setValue }: Props): ReactElement => {

    const ref = useRef<HTMLInputElement>();

    return (
        <input
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ref={ref}
            value={value}
            onChange={(event) => {

                if(type === 'file')
                    setValue(ref.current && ref.current.files && ref.current.files.length === 1 ? ref.current?.files[0].path : '')
                else
                    setValue(event.target.value)
            }}
            type={type ?? 'text'}
            placeholder={placeholder} />
    );
}

export default Input;
