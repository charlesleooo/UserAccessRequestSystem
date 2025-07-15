import AppLogoIcon from '@/components/app-logo-icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-md flex-col gap-6">
                <div className="flex flex-col gap-6">
                    <Card className="rounded-xl">
                        <Link href={route('home')} className="flex items-center gap-2 self-center font-medium">
                            <div className="h-2 w-full items-center justify-center">
                                <AppLogoIcon className="size-16 fill-current text-black dark:text-white" />
                            </div>
                        </Link>
                        <CardHeader className="px-10 pt-8 pb-4 text-center">
                            <CardTitle className="text-xl">{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </CardHeader>
                        <CardContent className="px-10">{children}</CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
