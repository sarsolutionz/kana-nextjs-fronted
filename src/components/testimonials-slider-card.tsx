"use client";

import { z } from "zod";
import Image from "next/image";
import { toast } from "sonner";
import { useForm } from "react-hook-form"
import { imageLoader } from "@/lib/imageLoader";
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react";
import { MoreVertical, Trash2 } from "lucide-react";

import Autoplay from "embla-carousel-autoplay";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useConfirm } from "@/hooks/use-confirm";

import { Testimonial } from "@/features/members/types";
import { useMemberId } from "@/features/members/hooks/use-member-id";
import { DocumentsFormSchema } from "@/features/members/schemas";

import {
  useDeleteVehicleDocMutation,
  useVerifyDocumentMutation
} from "@/redux/features/vehicle/vehicleApi";

interface TestimonialSliderCardProps {
  testimonials: Testimonial[];
  refetch: () => void;
}

const documentTypes = ["Aadhaar Card", "Pan Card", "PUC", "Driving License", "RC", "Insurance"];

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

  const savedItems =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("savedItems") || "[]")
      : [];

  const form = useForm<z.infer<typeof DocumentsFormSchema>>({
    resolver: zodResolver(DocumentsFormSchema),
    defaultValues: {
      items: savedItems,
    },
  })

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

  const [verifyDocument, { data: verifiedData, isLoading: verifiedLoading }] =
    useVerifyDocumentMutation();

  const status = verifiedData?.status ?? undefined
  const message = verifiedData?.message ?? undefined
  const items_data = verifiedData?.kept_image_ids ?? undefined

  useEffect(() => {
    if (status === 200) {
      toast.success(message);
    }
    if (status === 400) {
      toast.error(message)
    }
  }, [message, status]);

  useEffect(() => {
    if (items_data && Array.isArray(items_data)) {
      localStorage.setItem("savedItems", JSON.stringify(items_data));
    }
  }, [items_data]);

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

  const onSubmit = async (data: z.infer<typeof DocumentsFormSchema>) => {
    try {
      await verifyDocument({ id: memberId, image_ids: data.items })
      refetch();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <section className="w-full py-4">
      <div className="flex justify-end">
        <Card className="w-full max-w-sm mb-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <CardContent>
                <FormField
                  control={form.control}
                  name="items"
                  render={() => (
                    <FormItem>
                      <div className="mt-4">
                        <FormLabel className="text-base">Documents</FormLabel>
                        <FormDescription>
                          Select the documents correct or verified.
                        </FormDescription>
                      </div>
                      {testimonials.map((item, index) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="items"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-center gap-2"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item.id])
                                        : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        )
                                    }}
                                    disabled={verifiedLoading}
                                    className="mt-2"
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {documentTypes[index] || "Other Document"}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="mt-2">Verify</Button>
              </CardContent>
            </form>
          </Form>
        </Card>
      </div>
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
                  <DropdownMenu modal={false}>
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
                  <CardContent className="relative items-center justify-center">
                    <p className="text-center text-xs text-primary font-semibold">
                      {documentTypes[index] || "Other Document"}
                    </p>
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
