import { Category, PageProps } from "@/types"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Link, useForm, usePage } from "@inertiajs/react";
import { Button } from "../ui/button";
import React from "react";

export default function FormCreate({ handleSuccess }: { handleSuccess: () => void }) {
    const { errors } = usePage<PageProps>().props;

    const { data, setData, post, processing, reset } = useForm<{
        name: string;
    }>({
        name: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('categories.store'), {
            onSuccess: () => {
                handleSuccess();
            },
            onError: (err) => {
                console.error('Error', err);
            }
        });
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col">
                <Label>Nama Kategori</Label>
                <Input
                    placeholder="Nama Kategori"
                    onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && (<p className="text-[0.8rem] font-medium text-destructive">{errors.name}</p>)}
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
