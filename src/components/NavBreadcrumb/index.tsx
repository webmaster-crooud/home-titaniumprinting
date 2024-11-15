import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import React from 'react';
import { NavBreadcrumbData } from '../../../libs/type';

type propsNavBreadcrumb = {
    data: NavBreadcrumbData[];
};

export const NavBreadcrumb: React.FC<propsNavBreadcrumb> = ({ data }) => {
    return (
        <div className="border-b border-light-gray">
            <Breadcrumb className="w-10/12 py-2 mx-auto">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="transition-colors duration-300 ease-in-out text-gray hover:text-dark" href="/">
                            Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    {data &&
                        data.map((breadcrumb, index) => (
                            <React.Fragment key={index}>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    {breadcrumb.url ? (
                                        <BreadcrumbLink
                                            className="transition-colors duration-300 ease-in-out text-gray hover:text-dark"
                                            href={breadcrumb.url}
                                        >
                                            {breadcrumb.title}
                                        </BreadcrumbLink>
                                    ) : (
                                        <BreadcrumbPage className="font-medium text-dark">{breadcrumb.title}</BreadcrumbPage>
                                    )}
                                </BreadcrumbItem>
                            </React.Fragment>
                        ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};
