import Image from 'next/image';
import { IconStarFilled } from '@tabler/icons-react';

export const ReviewCard = () => {
    return (
        <div className={`relative overflow-hidden bg-white rounded-[16px] shadow p-4`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 justify-start">
                    <Image
                        src={'/assets/users/users.jpeg'}
                        alt="images users Titanium Printing"
                        width={300}
                        height={300}
                        priority
                        style={{ width: '40px', height: '40px', objectFit: 'cover', objectPosition: 'center', borderRadius: '30rem' }}
                    />

                    <h4 className="font-medium text-base">“The best time manager app”</h4>
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
            <p className="text-base font-light text-gray my-8">
                I love how user-friendly this app is! It&lsquo;s so easy to add events and set reminders, and it&lsquo;s made my life so much more
                organized.
            </p>
            <div className="flex items-center justify-between">
                <h4 className="font-medium text-base">Adam Gwadyr</h4>
                <h5 className="font-light text-sm text-gray">Entrepreneur</h5>
            </div>
        </div>
    );
};
