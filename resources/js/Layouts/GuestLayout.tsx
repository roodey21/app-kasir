import ApplicationLogo from '@/Components/ApplicationLogo';
import { Card, CardContent } from '@/Components/ui/card';
import { Link } from '@inertiajs/react';
import { GalleryVerticalEnd } from 'lucide-react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="relative hidden p-6 md:p-10 lg:block">
                <div className="rounded-[40px] from-[#4288F2] to-[#113E82] bg-gradient-to-br absolute inset-10 w-full pl-10 pr-20 py-16">
                    <div className="mb-10 -ml-14">
                        <img
                            src="/assets/macbook.png"
                            alt="Image"
                            className="rounded-2xl sm:h-[400px] 2xl:h-[600px]"
                        />
                    </div>
                    <p className='text-lg font-light text-white md:text-xl 2xl:text-2xl'>
                         Desain yang user-friendly membuat navigasi cepat dan mudah, bahkan bagi pemula.
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-end">
                    <a href="#" className="flex items-center gap-2 text-3xl font-semibold text-primary">
                        MASPOS
                    </a>
                </div>
                <div className="flex items-center justify-center flex-1">
                    <div className="w-full max-w-md">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
