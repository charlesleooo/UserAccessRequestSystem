import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return <img {...props} src="/images/ABUlogo.png" alt="My Company Logo" className="h-16 w-full object-contain" />;
}
