<script>
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    export let range;
</script>

<RadioGroup border="border-token border-surface-400-500-token" rounded="rounded-token" padding="px-2 py-1">
    <RadioItem bind:group={range} name="comparison" value={"week"}>Last week</RadioItem>
    <RadioItem bind:group={range} name="comparison" value={"month"}>Last month</RadioItem>
    <RadioItem bind:group={range} name="comparison" value={"three_months"}>Last three months</RadioItem>
    <RadioItem bind:group={range} name="comparison" value={"six_months"}>Last six months</RadioItem>
    <RadioItem bind:group={range} name="comparison" value={"year"}>Last year</RadioItem>
    <RadioItem bind:group={range} name="comparison" value={"all"}>All time</RadioItem>
</RadioGroup>