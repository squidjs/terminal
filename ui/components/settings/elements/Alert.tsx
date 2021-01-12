import React, { FC, ReactElement } from 'react';

export type AlertType = 'error' | 'success' | 'info';

interface Props {

    type: AlertType;
    text: string | null | undefined;
}

const Alert: FC<Props> = ({ type, text }: Props): ReactElement | null => {

    if(!text || text == '')
        return null;

    return <p className={`alert ${type}`}>{ text }</p>;
}

export default Alert;
