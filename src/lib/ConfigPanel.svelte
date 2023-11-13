<script>
	import { blur } from 'svelte/transition';
	import RangeSelector from './RangeSelector.svelte';
	import {goto} from '$app/navigation';
	export let busCost;
    export let carCost;
    export let hours;

	let showPanel = false;

	let range = 'month';

    let defaults = {
        busCost: 3.5,
        carCost: 1.2,
        hours: 4
    }

    function cancelAndClose() {
        busCost = defaults.busCost;
        carCost = defaults.carCost;
        hours = defaults.hours;
        toggleSettingsPanel();
    }

	function toggleSettingsPanel() {
		showPanel = !showPanel;
	}

	function saveSettings() {
		console.log('entered')
		goto(`/?range=${range}`);

	}

	$: console.log(range);
</script>

{#if showPanel}
	<div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
		<!-- Background backdrop, show/hide based on slide-over state. -->
		<div class="fixed inset-0" />

		<div class="fixed inset-0 overflow-hidden">
			<div class="absolute inset-0 overflow-hidden">
				<div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
					<!--
            Slide-over panel, show/hide based on slide-over state.
  
            Entering: "transform transition ease-in-out duration-500 sm:duration-700"
              From: "translate-x-full"
              To: "translate-x-0"
            Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
              From: "translate-x-0"
              To: "translate-x-full"
          -->
					<div class="pointer-events-auto w-screen max-w-xl" transition:blur={{ duration: 500 }}>
						<div class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
							<div class="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
								<div class="px-4 sm:px-6">
									<div class="flex items-start justify-between">
										<h2
											class="text-base font-semibold leading-6 text-gray-900"
											id="slide-over-title"
										>
											Settings
										</h2>
										<div class="ml-3 flex h-7 items-center">
											<button
												type="button"
												class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
												on:click={toggleSettingsPanel}
											>
												<span class="absolute -inset-2.5" />
												<span class="sr-only">Close panel</span>
												<svg
													class="h-6 w-6"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													aria-hidden="true"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M6 18L18 6M6 6l12 12"
													/>
												</svg>
											</button>
										</div>
									</div>
								</div>
								<div class="relative mt-6 flex-1 px-4 sm:px-6">
									<!-- Your content -->
									<div class="space-y-8">
										<div>
											<label for="dateRange" class="block text-sm font-medium leading-6 text-gray-900">Range</label>
											<div class="relative mt-2 rounded-md shadow-sm">
											  <RangeSelector bind:range/>
											</div>
										  </div>
										<div>
                                        <label for="busCost" class="block text-sm font-medium leading-6 text-gray-900">Bus cost per day</label>
                                        <div class="relative mt-2 rounded-md shadow-sm">
                                          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span class="text-gray-500 sm:text-sm">£</span>
                                          </div>
                                          <input type="text" name="busCost" id="busCost" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00" aria-describedby="price-currency" bind:value={busCost}>
                                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                            <span class="text-gray-500 sm:text-sm" id="price-currency">GBP</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div>
                                        <label for="carCost" class="block text-sm font-medium leading-6 text-gray-900">Car parking cost per hour</label>
                                        <div class="relative mt-2 rounded-md shadow-sm">
                                          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span class="text-gray-500 sm:text-sm">£</span>
                                          </div>
                                          <input type="text" name="carCost" id="carCost" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00" aria-describedby="price-currency" bind:value={carCost}>
                                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                            <span class="text-gray-500 sm:text-sm" id="price-currency">GBP</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div>
                                        <label for="hours" class="block text-sm font-medium leading-6 text-gray-900">Number of hours parked</label>
                                        <div class="mt-2">
                                          <input type="text" name="hours" id="hours" class="block w-full rounded-md border-0 py-1.5 pl-4 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="you@example.com" bind:value={hours}>
                                        </div>
                                      </div></div>
								</div>
							</div>
							<div class="flex flex-shrink-0 justify-end px-4 py-4">
								<button
									type="button"
									class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                                    on:click={cancelAndClose}
									>Defaults</button
								>
								<button
									type="submit"
									class="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    on:click={saveSettings}
									>Save</button
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="flex items-start justify-between fixed inset-y-0 right-0 flex max-w-full pl-10 p-5" transition:blur={{ duration: 500 }}>
		<button
			type="button"
			class="relative rounded-md hover:text-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500"
			on:click={toggleSettingsPanel}
		>
			<span class="absolute -inset-2.5" />
			<span class="sr-only">Open panel</span>
			<svg class="h-6 w-6 "
				version="1.1"
				id="Capa_1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 389.663 389.663"
				xml:space="preserve"
			>
				<g>
					<g>
						<path
							d="M194.832,132.997c-34.1,0-61.842,27.74-61.842,61.838c0,34.1,27.742,61.841,61.842,61.841
			c34.099,0,61.841-27.741,61.841-61.841C256.674,160.737,228.932,132.997,194.832,132.997z M194.832,226.444
			c-17.429,0-31.608-14.182-31.608-31.61c0-17.428,14.18-31.605,31.608-31.605c17.429,0,31.607,14.178,31.607,31.605
			C226.439,212.264,212.262,226.444,194.832,226.444z"
						/>
						<path
							d="M385.23,150.784c-2.816-2.812-6.714-4.427-10.688-4.427l-49.715,0.015l-3.799-9.194l35.149-35.155
			c5.892-5.894,5.892-15.483,0-21.377l-47.166-47.162c-2.688-2.691-6.586-4.235-10.688-4.235c-4.103,0-7.996,1.544-10.687,4.235
			L252.48,68.639l-9.188-3.797V15.116C243.292,6.781,236.511,0,228.177,0h-66.694c-8.335,0-15.116,6.78-15.116,15.115v49.716
			l-9.194,3.801l-35.151-35.135c-2.855-2.854-6.65-4.426-10.686-4.426c-4.036,0-7.832,1.572-10.688,4.427L33.476,80.67
			c-2.813,2.814-4.427,6.711-4.427,10.688c0,3.984,1.613,7.882,4.427,10.693l35.151,35.127l-3.811,9.188l-49.697,0.005
			C6.781,146.372,0,153.153,0,161.488v66.708c0,4.035,1.573,7.832,4.431,10.689c2.817,2.815,6.713,4.432,10.688,4.432l49.708-0.021
			l3.799,9.195l-35.133,35.149c-5.894,5.896-5.894,15.484,0,21.378l47.161,47.172c2.692,2.69,6.591,4.233,10.693,4.233
			c4.105,0,8.002-1.543,10.69-4.233l35.136-35.162l9.186,3.815l0.008,49.691c0,8.338,6.781,15.121,15.116,15.121l66.708,0.006h0.162
			c8.336,0,15.116-6.781,15.116-15.117c0-0.721-0.049-1.444-0.147-2.151l-0.015-0.207l-0.013-47.355l9.195-3.801l35.149,35.139
			c2.855,2.857,6.65,4.432,10.688,4.432c4.035,0,7.83-1.573,10.686-4.432l47.172-47.166c2.855-2.854,4.429-6.649,4.429-10.688
			c0-4.045-1.572-7.847-4.429-10.699l-35.157-35.125l3.809-9.195h49.707c8.336,0,15.119-6.78,15.119-15.114v-66.708
			C389.662,157.438,388.088,153.641,385.23,150.784z M359.428,213.063h-44.696c-6.134,0-11.615,3.662-13.966,9.328l-11.534,27.865
			c-2.351,5.672-1.062,12.141,3.274,16.482l31.609,31.58l-25.789,25.789l-31.605-31.603c-2.854-2.853-6.649-4.422-10.69-4.422
			c-1.992,0-3.938,0.388-5.785,1.147l-27.854,11.537c-5.666,2.349-9.327,7.832-9.327,13.972l0.008,44.688l-36.468-0.01
			l-0.008-44.686c0-6.136-3.661-11.615-9.328-13.966l-27.856-11.536c-1.854-0.768-3.806-1.155-5.802-1.155
			c-4.036,0-7.829,1.571-10.677,4.43l-31.586,31.615L65.559,298.33l31.592-31.604c4.339-4.343,5.625-10.81,3.275-16.478
			L88.89,222.393c-2.352-5.666-7.833-9.328-13.965-9.328l-44.688,0.01v-36.466l44.688-0.01c6.134,0,11.615-3.662,13.965-9.328
			l11.536-27.854c2.349-5.676,1.063-12.146-3.275-16.482L65.548,91.359l25.79-25.796l31.599,31.582
			c2.856,2.857,6.658,4.43,10.704,4.43c1.988,0,3.928-0.385,5.764-1.144l27.861-11.524c5.671-2.351,9.336-7.834,9.336-13.97V30.231
			h36.459v44.705c0,6.137,3.662,11.618,9.328,13.965l27.855,11.534c1.848,0.766,3.795,1.153,5.789,1.153
			c4.039,0,7.832-1.572,10.684-4.429l31.607-31.617l25.789,25.789l-31.609,31.607c-4.336,4.339-5.621,10.806-3.274,16.478
			l11.534,27.858c2.351,5.669,7.832,9.332,13.966,9.332l44.696-0.01L359.428,213.063L359.428,213.063z"
						/>
					</g>
				</g>
			</svg>
		</button>
	</div>
{/if}
