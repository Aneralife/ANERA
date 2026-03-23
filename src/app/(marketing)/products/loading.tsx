import { Container, Section, Skeleton } from "@/components/ui";

export default function ProductsLoading() {
  return (
    <Section theme="light" spacing="lg">
      <Container>
        <div className="text-center">
          <Skeleton className="mx-auto h-12 w-64" />
          <Skeleton className="mx-auto mt-4 h-5 w-48" />
        </div>
        <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 sm:gap-x-8 sm:gap-y-14">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="aspect-[3/4] w-full" />
              <Skeleton className="mt-4 h-3.5 w-3/4" />
              <Skeleton className="mt-2 h-3.5 w-1/3" />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
