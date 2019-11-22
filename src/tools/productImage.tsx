import * as React from 'react';
import { Image } from 'tonva';

interface ProductImageProps {
    className?: string;
    style?: React.CSSProperties;
    chemicalId: string;
}

export function ProductImage(props: ProductImageProps) {

    let { style, className, chemicalId } = props;
    return <Image src={chemicalId && (chemicalId)}
        style={style} className={className}  />;
}
