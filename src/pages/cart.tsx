import React, { useState, useEffect } from 'react';

export default function Cart() {
    const quantityBreaks = [
        { minQty: 1, maxQty: 9, price: 100000, percentage: 0 },
        { minQty: 10, maxQty: 24, price: 100000, percentage: 10 },
        { minQty: 25, maxQty: 49, price: 100000, percentage: 15 },
        { minQty: 50, maxQty: 99, price: 100000, percentage: 20 },
        { minQty: 100, maxQty: null, price: 100000, percentage: 25 }, // null maxQty means no upper limit
    ];

    const [inputQty, setInputQty] = useState(1);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [appliedBreak, setAppliedBreak] = useState(null);

    const calculatePrice = (quantity: number) => {
        // Find the applicable quantity break
        const applicableBreak = quantityBreaks.find(
            (break_) => quantity >= break_.minQty && (break_.maxQty === null || quantity <= break_.maxQty),
        );

        if (!applicableBreak) return null;

        // Calculate discounted price
        const discount = (applicableBreak.price * applicableBreak.percentage) / 100;
        const finalPrice = applicableBreak.price - discount;

        return {
            break: applicableBreak,
            price: finalPrice,
        };
    };

    useEffect(() => {
        const result = calculatePrice(inputQty);
        if (result) {
            setCurrentPrice(result.price);
            setAppliedBreak(result.break);
        }
    }, [inputQty]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value) || 1;
        setInputQty(Math.max(1, value));
    };

    return (
        <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
            <div className="mb-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Quantity
                </label>
                <input
                    type="number"
                    id="quantity"
                    min="1"
                    value={inputQty}
                    onChange={handleQuantityChange}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">Price Details</h3>
                {appliedBreak && (
                    <div className="mt-2 space-y-2">
                        <p className="text-sm text-gray-600">Base Price: Rp {appliedBreak.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Discount: {appliedBreak.percentage}%</p>
                        <p className="text-lg font-bold text-green-600">
                            Final Price: Rp {currentPrice.toLocaleString()}
                        </p>
                    </div>
                )}
            </div>

            <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900">Quantity Breaks</h4>
                <div className="mt-2 space-y-2">
                    {quantityBreaks.map((break_, index) => (
                        <div
                            key={index}
                            className={`p-2 text-sm rounded ${
                                appliedBreak?.minQty === break_.minQty ? 'bg-blue-100 border-blue-300' : 'bg-gray-50'
                            }`}
                        >
                            {break_.maxQty ? `${break_.minQty}-${break_.maxQty} units` : `${break_.minQty}+ units`}:{' '}
                            {break_.percentage}% discount
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
