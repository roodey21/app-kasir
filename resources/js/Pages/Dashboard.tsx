import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { formatRupiah } from '@/helper/format';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Category, Product } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Plus, Search, Trash2 } from 'lucide-react';
import useCartStore from '@/store/cart';
import { Dialog, DialogHeader } from '@/Components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/Components/ui/alert-dialog';
import ProductCard from '@/Components/product/product-card';
import { useState } from 'react';

export default function Dashboard({
    categories, products
}: {
    categories: Category[];
    products: Product[]
}) {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const addToCart = useCartStore((state) => state.addToCart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    const deleteProduct = (productId: number) => {
        router.delete(`/products/${productId}`, {
            onSuccess: () => {
                removeFromCart(productId);
            },
            onError: (err) => {
                console.error('Error', err);
            }
        });
    };

    const filteredProducts = products.filter(product =>
        (selectedCategory === null || product.category.id === selectedCategory) &&
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-row flex-grow gap-6">
                    <div className="relative sm:max-w-[250px]">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search"
                            className="pl-8"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-row items-center gap-3 overflow-scroll no-scrollbar'>
                        <Button
                            variant={selectedCategory === null ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(null)}
                        >
                            Semua
                        </Button>
                        {categories.map((category) => (
                            <Button
                                key={category.id}
                                variant={selectedCategory === category.id ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                {category.name}
                            </Button>
                        ))}
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-4">
                            {filteredProducts.length ? filteredProducts.map((product, index) => (
                                <ProductCard key={index} product={product} addToCart={addToCart} deleteProduct={deleteProduct} />
                            )): (
                                <p className="text-center col-span-full">~ Produk tidak ditemukan ~</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
