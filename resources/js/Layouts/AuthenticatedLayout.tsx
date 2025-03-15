import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import FormCreate from '@/Components/product/form-create';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { formatRupiah } from '@/helper/format';
import useCartStore from '@/store/cart';
import { CartItem, Product } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LogOut, Plus, Power, ShoppingCart } from 'lucide-react';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const cart = useCartStore((state) => state.cart);

    const totalPrice = cart.reduce((acc: number, item: CartItem) => acc + item.price * item.qty, 0);

    const totalQty = cart.reduce((acc: number, item: CartItem) => acc + item.qty, 0);

    const { props } = usePage()

    useEffect(() => {
        if (props.flash.success) {
            toast.success(props.flash.success);
        }
        if (props.flash.error) {
            toast.error(props.flash.error);
        }

        if (props.errors.error) {
            toast.error(props.errors.error);
        }
    }, [props.flash, props.errors]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="bg-white border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex items-center shrink-0">
                                <Link href="/">
                                    {/* <ApplicationLogo className="block w-auto text-gray-800 fill-current h-9 dark:text-gray-200" /> */}
                                    <span className="text-3xl font-bold text-primary">
                                        MASPOS
                                    </span>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="flex gap-4 h-min">
                                <Link href="/categories">
                                    <Button variant="default">
                                        <Plus />
                                        Tambah Kategori
                                    </Button>
                                </Link>
                                <Link href="/products">
                                    <Button variant="default">
                                        <Plus />
                                        Tambah Produk
                                    </Button>
                                </Link>

                                <div className='flex flex-row items-center rounded-md bg-primary-foreground dark:bg-gray-600 dark:text-white'>
                                    <Link href="/cart">
                                        <Button variant="default" className='relative'>
                                            {cart?.length ? (
                                                <span className='absolute right-0 p-0.5 px-1.5 text-xs -translate-y-full bg-green-500 rounded-full top-1/2'>{totalQty}</span>
                                            ) : null}
                                            <ShoppingCart />
                                        </Button>
                                    </Link>
                                    {cart?.length ? (
                                        <div className="flex items-center gap-1 px-3 text-sm price">
                                            <span>Total tagihan</span>
                                            <span className='font-semibold'>{formatRupiah(totalPrice)}</span>
                                        </div>
                                    ) : null}
                                </div>

                            </div>
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        {/* <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link> */}
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="flex items-center -me-2 sm:hidden">
                            <Link href="/cart" className="me-2">
                                <Button variant="default" className='relative'>
                                    {cart?.length ? (
                                        <span className='absolute right-0 p-0.5 px-1.5 text-xs -translate-y-full bg-green-500 rounded-full top-1/2'>{totalQty}</span>
                                    ) : null}
                                    <ShoppingCart />
                                </Button>
                            </Link>
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                            >
                                <svg
                                    className="w-6 h-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            {/* <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink> */}
                            <ResponsiveNavLink href={route('products.index')} className="flex flex-row items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Tambah Produk
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('products.index')} className="flex flex-row items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Tambah Kategori
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="flex flex-row items-center gap-2"
                            >
                                <Power className="w-4 h-4" />
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
            <Toaster position='top-right' className='!top-20'/>
        </div>
    );
}
