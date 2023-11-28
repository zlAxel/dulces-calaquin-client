import { useApp } from "../../hooks/useApp";
import { ProductMain } from "../ProductMain";

export const TopProducts = () => { 

    const { topProducts } = useApp();

    return (
        <div className="mx-auto max-w-none sm:max-w-7xl overflow-hidden sm:px-6 lg:px-8 mt-20">
            <h2 className="sr-only">Products</h2>
            <div className="-mx-px grid grid-cols-1 w-full border-0 sm:border-l sm:border-t border-gray-200 sm:mx-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {topProducts.map((product) => (
                    <ProductMain product={product} key={product.id} />
                ))}
            </div>
        </div>
    )
}
