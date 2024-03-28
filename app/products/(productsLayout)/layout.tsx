import LeftSidebar from '@/components/leftSidebar/LeftSidebar';

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex">
        <LeftSidebar />
      </div>
      <main className="h-full w-full">{children}</main>
    </div>
  );
};

export default ProductsLayout;
