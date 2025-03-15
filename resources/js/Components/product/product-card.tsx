import { Plus, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Card } from "../ui/card";
import { formatRupiah } from "@/helper/format";
import { Button } from "../ui/button";
import { Product } from "@/types";
import { toast } from "sonner";

export default function ProductCard({ product, addToCart, deleteProduct }: { product: Product, addToCart: (product: Product) => void, deleteProduct: (productId: number) => void }) {
    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`produk berhasil dimasukkan ke keranjang!`);
    };

    return (
        <Card className="flex flex-col h-full">
            <div className="flex flex-col h-full p-2">
                <div className="relative overflow-hidden rounded-md image">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <div className="absolute p-1 bg-white border-white rounded opacity-50 right-1 bottom-1 text-destructive hover:cursor-pointer hover:opacity-100">
                                <Trash2 className='w-4 h-4' />
                            </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Hapus Produk</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Apakah anda yakin ingin menghapus produk ini?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteProduct(product.id)}>Hapus</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <div className="bg-center bg-cover aspect-square" style={{ backgroundImage: `url(${product.image_url})` }}></div>
                    {/* <img src={product.image_url} alt="" className="aspect-square" /> */}
                </div>
                <div className="flex flex-col flex-grow pt-2">
                    <div className="pb-2 product-description">
                        <h5 className="font-semibold">{product.name}</h5>
                        <h6 className="text-sm font-semibold text-green-600">{formatRupiah(product.price)}</h6>
                    </div>
                    <Button variant="default" size={"sm"} className="w-full mt-auto" onClick={handleAddToCart}>
                        <Plus />
                        Keranjang
                    </Button>
                </div>
            </div>
        </Card>
    )
}
