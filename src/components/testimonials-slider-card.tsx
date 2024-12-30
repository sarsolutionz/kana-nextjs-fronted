"use client";

import { toast } from "sonner";
import Image from "next/image";
import { useEffect, useState } from "react";
import { imageLoader } from "@/lib/imageLoader";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import { Testimonial } from "@/features/members/types";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { MoreVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

import { useConfirm } from "@/hooks/use-confirm";
import { useMemberId } from "@/features/members/hooks/use-member-id";

import { useDeleteVehicleDocMutation } from "@/redux/features/vehicle/vehicleApi";

interface TestimonialSliderCardProps {
  testimonials: Testimonial[];
  refetch: () => void;
}

export const TestimonialSliderCard = ({
  testimonials,
  refetch,
}: TestimonialSliderCardProps) => {
  const memberId = useMemberId();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Testimonial",
    "Are you sure you want to delete this testimonial?"
  );

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const [deleteVehicleDoc, { data, isSuccess, error, isLoading }] =
    useDeleteVehicleDocMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message;
      toast.success(message);
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as { data?: { errors?: { error?: string } } };
        const errorMessage =
          errorData?.data?.errors?.error || "Something went wrong";
        toast.error(errorMessage);
      }
    }
  }, [isSuccess, error, data?.message, refetch]);

  const handleDelete = async (id: string, imgId: string) => {
    if (!imgId) return;
    const ok = await confirm();
    if (!ok) return;

    try {
      const payload = {
        id,
        image_ids: [imgId],
      };

      await deleteVehicleDoc(payload);
      refetch();
      if (testimonials.length === 1) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full py-4">
      <div className="mx-auto lg:max-w-6xl px-3">
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: true,
            }),
          ]}
          setApi={setApi}
        >
          <CarouselContent>
            <ConfirmDialog />
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="shadow-sm p-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="size-8 p-0">
                        <MoreVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem
                        disabled={isLoading}
                        onClick={() => handleDelete(memberId, testimonial.id)}
                      >
                        <Trash2 className="size-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <CardContent className="relative items-center justify-center p-6">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div>
                          <div className="relative w-full h-[250px] cursor-zoom-in overflow-hidden rounded-lg">
                            <Image
                              loader={imageLoader}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover rounded-lg"
                              alt={testimonial.name}
                              src={testimonial.imgSrc}
                              loading="lazy"
                            />
                          </div>
                          <p className="text-center mt-1 text-xs text-muted-foreground">
                            {testimonial.name}
                          </p>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="p-0 max-w-[90vw] md:max-w-[800px]">
                        <Carousel setApi={setApi}>
                          <CarouselContent>
                            {testimonials.map(
                              (innerTestimonial, innerIndex) => (
                                <CarouselItem key={innerIndex}>
                                  <div
                                    className="relative w-full"
                                    style={{ height: "80vh" }}
                                  >
                                    <Image
                                      loader={imageLoader}
                                      fill
                                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                      className="object-contain rounded-lg"
                                      alt={innerTestimonial.name}
                                      src={innerTestimonial.imgSrc}
                                      loading="lazy"
                                    />
                                  </div>
                                </CarouselItem>
                              )
                            )}

                            {/* </div> */}
                          </CarouselContent>
                          <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 fill-black" />
                          <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 fill-black" />
                        </Carousel>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 fill-black" />
          <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 fill-black" />
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </div>
      </div>
    </section>
  );
};
