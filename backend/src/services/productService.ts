import e from "express";
import productModel from "../models/productModel";

export const getAllProducts = async (): Promise<{ data: any[]; statuscode: number }> => {
    try {
        const products = await productModel.find();
        return { data: products, statuscode: 200 };
    } catch (error) {
        return { data: [], statuscode: 400 };
    }
}

export const seedInitialProducts = async () => {
    try {
        const initialProducts = [
            {
                title: "Dell Laptop",
                stock: 10,
                price: "15000",
                image : "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg"

            },
            {
                title: "Asus Laptop",
                stock: 10,
                price: "20000",
                image : "https://eg-en.store.asus.com/media/catalog/product/_/o/_ovrtk5r02wy6mut6.png?width=439&height=439&store=en_EG&image-type=image"
            },
            {
                title: "HP Laptop",
                stock: 10,
                price: "10000",
                image : "https://i5.walmartimages.com/seo/HP-Pavilion-13-3-FHD-Intel-Core-i3-8GB-RAM-128GB-SSD-Silver_906cf222-d138-430a-8146-d129b0cca3a2_2.f838f300a6e31f50074faf4091a1da7b.jpeg"
            }
        ];
        try {
            const products = await getAllProducts();
            if (products.data.length === 0) {
                await productModel.insertMany(initialProducts);
            }
        } catch (error) {
            return { data: error, statuscode: 400 };
        }
    }
    catch (error) {
        return { data: error, statuscode: 400 };
    }
   

   
}
