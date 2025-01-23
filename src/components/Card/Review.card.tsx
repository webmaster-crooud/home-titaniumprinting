import Image from 'next/image';
import { IconStarFilled } from '@tabler/icons-react';
import React from 'react';

type propsReviewCard = {
    name: string;
    value: string;
};
export const ReviewCard: React.FC<propsReviewCard> = ({ name, value }) => {
    return (
        <div className={`relative overflow-hidden bg-white rounded-[16px] shadow p-4`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-3">
                    <Image
                        src={'/assets/users/users.jpeg'}
                        alt="images users Titanium Printing"
                        width={300}
                        height={300}
                        priority
                        style={{
                            width: '40px',
                            height: '40px',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            borderRadius: '30rem',
                        }}
                    />

                    <h4 className="text-base font-medium">“The best time manager app”</h4>
                </div>

                <div className="flex items-center justify-end gap-1">
                    <IconStarFilled size={20} className="text-blue" />
                    <IconStarFilled size={20} className="text-blue" />
                    <IconStarFilled size={20} className="text-blue" />
                    <IconStarFilled size={20} className="text-blue" />
                    <IconStarFilled size={20} className="text-blue" />
                </div>
            </div>
            {/* Body Card */}
            <p className="my-8 text-base font-light text-gray">{value}</p>
            <div className="flex items-center justify-between">
                <h4 className="text-base font-medium">{name}</h4>
                <h5 className="text-sm font-light text-gray">Entrepreneur</h5>
            </div>
        </div>
    );
};
