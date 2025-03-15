import { Category, PageProps } from "@/types"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Link, useForm, usePage } from "@inertiajs/react";
import { Button } from "../ui/button";
import React from "react";

export default function FormCreate({ categories, handleSuccess }: { categories: Category[], handleSuccess: () => void }) {
    const { errors } = usePage<PageProps>().props;

    const { data, setData, post, processing } = useForm<{
        name: string;
        price: string;
        image: File | null;
        category_id: string;
    }>({
        name: "",
        price: "",
        image: null,
        category_id: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'), {
            onSuccess: () => {
                handleSuccess()
            },
            onError: (err) => {
                console.error('Error', err)
            }
        });
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col">
                <Label>Foto Produk</Label>
                <Input
                    type="file"
                    placeholder="Foto Produk"
                    onChange={(e) => {
                        const file = e.target.files ? e.target.files[0] : null;
                        setData('image', file);
                    }}
                />
                {errors.image && (<p className="text-[0.8rem] font-medium text-destructive">{errors.image}</p>)}
            </div>
            <div className="flex flex-col">
                <Label>Nama Produk</Label>
                <Input
                    placeholder="Nama Produk"
                    onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && (<p className="text-[0.8rem] font-medium text-destructive">{errors.name}</p>)}
            </div>
            <div className="flex flex-col">
                <Label>Harga</Label>
                <Input
                    placeholder="Input Harga"
                    onChange={(e) => setData('price', e.target.value)}
                    type="number"
                />
                {errors.price && (<p className="text-[0.8rem] font-medium text-destructive">{errors.price}</p>)}
            </div>
            <div className="flex flex-col">
                <Label>Pilih Kategori</Label>
                <Select onValueChange={(value) => setData('category_id', value)}>
                    <SelectTrigger className="flex-grow w-full min-w-0 rounded-r-none">
                        <SelectValue placeholder="Pilih Tipe Surat" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories?.length ? categories.map((category, index) => (
                            <SelectItem
                                value={category.id.toString()}
                                key={index}
                            >
                                {category.name}
                            </SelectItem>
                        )) : (
                            <SelectItem value='""' disabled>No options listed</SelectItem>
                        )}
                    </SelectContent>
                </Select>
                {errors.category_id && (<p className="text-[0.8rem] font-medium text-destructive">{errors.category_id}</p>)}
            </div>
            <div className="flex flex-row w-full gap-4 pt-6 border-t">
                <Link href="/dashboard" className="w-full">
                    <Button variant="outline" className="w-full">
                        Kembali
                    </Button>
                </Link>
                <Button variant="default" onClick={handleSubmit} disabled={processing} className="w-full">
                    {processing && (
                        <div className="w-4 h-4 mr-2 border-2 rounded-full border-t-gray-500 animate-spin"></div>
                    )}
                    Simpan
                </Button>
            </div>
        </div>
    )
}
