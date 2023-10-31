<script>
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    export let comp
</script>

<RadioGroup>
	<RadioItem bind:group={comp} name="comparison" value={"bus"}><i class="fa-solid fa-bus fa-2xl"></i></RadioItem>
	<RadioItem bind:group={comp} name="comparison" value={"car"}><i class="fa-solid fa-car fa-2xl"></i></RadioItem>
</RadioGroup>