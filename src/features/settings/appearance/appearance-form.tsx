import { z } from 'zod'
import { cn } from '@/lib/utils'
import { useFont } from "@/context/font-context";
import { useForm } from 'react-hook-form'
import { useTheme } from "next-themes";
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { appearanceFormSchema, fonts } from '../schemas'

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Button,
    buttonVariants
} from '@/components/ui/button'
import {
    RadioGroup,
    RadioGroupItem
} from '@/components/ui/radio-group'

import { useStore } from "@/hooks/use-store";
import { useSidebar } from "@/hooks/use-sidebar";

export const AppearanceForm = () => {
    const { font, setFont } = useFont()
    const { theme, setTheme } = useTheme()

    const form = useForm<z.infer<typeof appearanceFormSchema>>({
        resolver: zodResolver(appearanceFormSchema),
        defaultValues: {
            theme: theme as 'light' | 'dark',
            font,
        },
        mode: "onChange",
    });

    const sidebar = useStore(useSidebar, (x) => x);
    if (!sidebar) return null;
    const { settings, setSettings } = sidebar;

    const onSubmit = (data: z.infer<typeof appearanceFormSchema>) => {
        if (data.font != font) setFont(data.font)
        if (data.theme != theme) setTheme(data.theme)
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <TooltipProvider>
                    <div className="flex gap-6 mt-6">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is-hover-open"
                                        onCheckedChange={(x) => setSettings({ isHoverOpen: x })}
                                        checked={settings.isHoverOpen}
                                    />
                                    <Label htmlFor="is-hover-open">Hover Open</Label>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>When hovering on the sidebar in mini state, it will open</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="disable-sidebar"
                                        onCheckedChange={(x) => setSettings({ disabled: x })}
                                        checked={settings.disabled}
                                    />
                                    <Label htmlFor="disable-sidebar">Disable Sidebar</Label>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Hide sidebar</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </TooltipProvider>
                <FormField
                    control={form.control}
                    name='font'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Font</FormLabel>
                            <div className='relative w-max'>
                                <FormControl>
                                    <select
                                        className={cn(
                                            buttonVariants({ variant: 'outline' }),
                                            'w-[200px] appearance-none font-normal capitalize',
                                            'dark:bg-background dark:hover:bg-background'
                                        )}
                                        {...field}
                                    >
                                        {fonts.map((font) => (
                                            <option key={font} value={font}>
                                                {font}
                                            </option>
                                        ))}
                                    </select>
                                </FormControl>
                                <ChevronDownIcon className='absolute top-2.5 right-3 h-4 w-4 opacity-50' />
                            </div>
                            <FormDescription className='font-manrope'>
                                Set the font you want to use in the dashboard.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='theme'
                    render={({ field }) => (
                        <FormItem className='space-y-1'>
                            <FormLabel>Theme</FormLabel>
                            <FormDescription>
                                Select the theme for the dashboard.
                            </FormDescription>
                            <FormMessage />
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className='grid max-w-md grid-cols-2 gap-8 pt-2'
                            >
                                <FormItem>
                                    <FormLabel className='[&:has([data-state=checked])>div]:border-primary'>
                                        <FormControl>
                                            <RadioGroupItem value='light' className='sr-only' />
                                        </FormControl>
                                        <div className='border-muted hover:border-accent items-center rounded-md border-2 p-1'>
                                            <div className='space-y-2 rounded-sm bg-[#ecedef] p-2'>
                                                <div className='space-y-2 rounded-md bg-white p-2 shadow-xs'>
                                                    <div className='h-2 w-[80px] rounded-lg bg-[#ecedef]' />
                                                    <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
                                                </div>
                                                <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs'>
                                                    <div className='h-4 w-4 rounded-full bg-[#ecedef]' />
                                                    <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
                                                </div>
                                                <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs'>
                                                    <div className='h-4 w-4 rounded-full bg-[#ecedef]' />
                                                    <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
                                                </div>
                                            </div>
                                        </div>
                                        <span className='block w-full p-2 text-center font-normal'>
                                            Light
                                        </span>
                                    </FormLabel>
                                </FormItem>
                                <FormItem>
                                    <FormLabel className='[&:has([data-state=checked])>div]:border-primary'>
                                        <FormControl>
                                            <RadioGroupItem value='dark' className='sr-only' />
                                        </FormControl>
                                        <div className='border-muted bg-popover hover:bg-accent hover:text-accent-foreground items-center rounded-md border-2 p-1'>
                                            <div className='space-y-2 rounded-sm bg-slate-950 p-2'>
                                                <div className='space-y-2 rounded-md bg-slate-800 p-2 shadow-xs'>
                                                    <div className='h-2 w-[80px] rounded-lg bg-slate-400' />
                                                    <div className='h-2 w-[100px] rounded-lg bg-slate-400' />
                                                </div>
                                                <div className='flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs'>
                                                    <div className='h-4 w-4 rounded-full bg-slate-400' />
                                                    <div className='h-2 w-[100px] rounded-lg bg-slate-400' />
                                                </div>
                                                <div className='flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs'>
                                                    <div className='h-4 w-4 rounded-full bg-slate-400' />
                                                    <div className='h-2 w-[100px] rounded-lg bg-slate-400' />
                                                </div>
                                            </div>
                                        </div>
                                        <span className='block w-full p-2 text-center font-normal'>
                                            Dark
                                        </span>
                                    </FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormItem>
                    )}
                />
                <Button type='submit'>Update preferences</Button>
            </form>
        </Form>
    )
}