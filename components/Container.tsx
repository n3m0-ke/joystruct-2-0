import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export function Container(props: Readonly<ContainerProps>){
    return (
        <div
            className= {`container p-8 mx-auto bg-black bg-opacity-50 mb-4 w-100 ${
                props.className ? props.className : ""
            }`}>
            {props.children}            
        </div>
    )
}