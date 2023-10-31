<script>
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    export let comp
</script>

<div class="mx-auto max-w-2xl my-2 text-center">
    <RadioGroup border="border-token border-surface-400-500-token" rounded="rounded-token" padding="px-7 py-7">
        <RadioItem bind:group={comp} name="comparison" value={"bus"}><i class="fa-solid fa-bus fa-2xl"></i></RadioItem>
        <RadioItem bind:group={comp} name="comparison" value={"car"}><i class="fa-solid fa-car fa-2xl"></i></RadioItem>
    </RadioGroup>
</div>