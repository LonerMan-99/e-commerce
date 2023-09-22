import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@chakra-ui/react';

import { AiOutlineRight } from 'react-icons/ai';

const Breadcrumbs = ({ breadcrumbItem = [] }) => {
  return (
    <Breadcrumb separator={<AiOutlineRight color='gray' />}>
      {breadcrumbItem.map((data, index) => (
        <BreadcrumbItem key={index} as={data.last ? 'b' : null}>
          <BreadcrumbLink href={data.href} isCurrentPage color='green.500'>
            {data.page}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
