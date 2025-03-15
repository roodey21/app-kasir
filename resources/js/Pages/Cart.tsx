    import { Button } from "@/Components/ui/button";
    import { Card, CardContent, CardFooter } from "@/Components/ui/card";
    import { Dialog, DialogContent, DialogTitle } from "@/Components/ui/dialog";
    import { formatRupiah } from "@/helper/format";
    import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
    import useCartStore from "@/store/cart";
    import { CartItem } from "@/types";
    import { Head, Link, router } from "@inertiajs/react";
    import { DialogDescription } from "@radix-ui/react-dialog";
    import { ScrollArea } from "@radix-ui/react-scroll-area";
    import { ArrowLeft, BadgeCheck, Minus, Plus } from "lucide-react";
    import { useState } from "react";

    interface Transaction {
        total: number;
        date: string;
    }

    export default function CartPage() {
        const cart = useCartStore((state) => state.cart)
        const addToCart = useCartStore((state) => state.addToCart);
        const decreaseQty = useCartStore((state) => state.decreaseQty);
        const removeFromCart = useCartStore((state) => state.removeFromCart);
        const clearCart = useCartStore((state) => state.clearCart);

        const [isDialogOpen, setIsDialogOpen] = useState(false);
        const [transaction, setTransaction] = useState<Transaction>({
            total: 0,
            date: ""
        });

        const handleCheckout = () => {
            if (cart.length > 0) {
                const total = cart.reduce((acc: number, item: CartItem) => acc + (item.qty * item.price), 0);
                router.post(route('cart.check-out'), {
                    total,
                    items: cart
                }, {
                    onSuccess: () => {
                        setTransaction({
                            total,
                            date: new Date().toDateString()
                        });
                        setIsDialogOpen(true);
                        clearCart();
                    }
                });
            }
        }

        return (
            <AuthenticatedLayout>
                <Head title="Keranjang" />

                <div className="py-12">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <Card>
                                <CardContent className="pt-6">
                                    <ScrollArea className="max-h-[calc(100vh-14rem)] h-full">
                                        <table className="w-full table-auto">
                                            <thead className="border-b">
                                                <tr className="[&>*]:py-2 [&>*]:font-medium">
                                                    <th className="text-left">Produk</th>
                                                    <th>Harga</th>
                                                    <th>Jumlah</th>
                                                    <th>Sub Total</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody className="">
                                                {cart?.length ? cart.map((item: CartItem) => (
                                                    <tr key={item.id} className="[&>*]:py-5">
                                                        <td>
                                                            <div className="flex items-center gap-4">
                                                                <img src={item.image_url} alt={item.name} className="aspect-square sm:aspect-video max-w-[75px] sm:max-w-[150px] rounded-md" />
                                                                <p>
                                                                    {item.name}
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 text-center">
                                                            {formatRupiah(item.price)}
                                                        </td>
                                                        <td className="p-4 text-center">
                                                            <div className="flex flex-row items-center justify-center gap-3">
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    className="w-8 h-8 rounded shrink-0"
                                                                    onClick={() => decreaseQty(item)}
                                                                >
                                                                    <Minus />
                                                                    <span className="sr-only">Decrease</span>
                                                                </Button>
                                                                {item.qty}
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    className="w-8 h-8 rounded shrink-0"
                                                                    onClick={() => addToCart(item)}
                                                                >
                                                                    <Plus />
                                                                    <span className="sr-only">Decrease</span>
                                                                </Button>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 text-center">
                                                            {formatRupiah(item.qty * item.price)}
                                                        </td>
                                                        <td>
                                                            <button className="text-destructive" onClick={() => removeFromCart(item.id)}>Hapus</button>
                                                        </td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td colSpan={5} className="py-5 text-center">Keranjang Masih kosong</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </ScrollArea>
                                </CardContent>
                                <CardFooter className="flex flex-col pt-6 text-right border-t">
                                    <div className="w-full mb-2 text-right">
                                        <p>Total Tagihan : <span className="font-semibold">{formatRupiah(cart.reduce((acc: number, item: CartItem) => acc + (item.qty * item.price), 0))}</span></p>
                                    </div>
                                    <div className="flex flex-row justify-end w-full gap-4">
                                        <Link href="/dashboard">
                                            <Button variant={"outline"} size={"lg"}>
                                                Kembali
                                            </Button>
                                        </Link>
                                        <Button size={"lg"} onClick={handleCheckout} disabled={cart.length === 0}>
                                            Bayar
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
                    <DialogTitle/>
                    <DialogDescription/>
                    <DialogContent className="text-center">
                        <div className="flex flex-col items-center">
                            <BadgeCheck className="w-40 h-40 mx-auto text-green-700" />
                            <h5 className="text-lg font-semibold text-green-700">Pembayaran Sukses</h5>
                        </div>
                        <div className="transaction-detail">
                            <div className="flex flex-col justify-normal font-extralight">
                                <span className="text-gray-400">Total</span>
                                <p className="font-semibold">{formatRupiah(transaction?.total)}</p>
                            </div>
                            <div className="text-gray-400 transaction-date">{transaction?.date}</div>
                        </div>
                        <Link href="/dashboard">
                            <Button variant="default" className="w-full">
                                <ArrowLeft/>
                                Kembali
                            </Button>
                        </Link>
                    </DialogContent>
                </Dialog>
            </AuthenticatedLayout>
        )
    }
