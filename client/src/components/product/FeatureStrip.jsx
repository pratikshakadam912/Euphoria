import React from "react";

export default function FeatureStrip() {
    return (
        <section className="bg-black py-12 px-6 md:px-20 text-white">
            <div className="grid gap-8 md:grid-cols-3 text-center">
                <div>
                    <h3 className="text-xl font-semibold">Premium Materials</h3>
                    <p className="mt-2 text-gray-300 text-sm">
                        Carefully selected materials for durability and comfort.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold">Fast Delivery</h3>
                    <p className="mt-2 text-gray-300 text-sm">
                        Quick and reliable shipping across India.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold">Trusted Quality</h3>
                    <p className="mt-2 text-gray-300 text-sm">
                        Loved by thousands of happy customers.
                    </p>
                </div>
            </div>
        </section>
    );
}
