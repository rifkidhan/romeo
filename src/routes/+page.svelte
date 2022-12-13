<script lang="ts">
	import { Logo, Button, Loading, Dropzone, Toggle } from '$lib/components/ui';
	import { signOut, getUser } from '@lucia-auth/sveltekit/client';
	import { invalidateAll } from '$app/navigation';

	const user = getUser();
	const userId = $user?.userId;

	let checked = true;
	let files: FileList;

	$: src = files ? URL.createObjectURL(files[0]) : null;

	$: {
		console.log('checked from toggle', checked);
		console.log('files', src);
	}

	const signOutHandler = async () => {
		await signOut();
		invalidateAll();
	};
</script>

<main class="flex flex-col gap-10">
	<Logo variant="mark" class="w-36" />
	<Loading type="dots" />
	{#if userId}
		<Button type="button" on:click={signOutHandler}>Sign Out</Button>
	{:else}
		<Button href="/signin">Sign In</Button>
	{/if}

	<Dropzone name="thumbnail" bind:files>
		<img
			{src}
			slot="preview"
			alt="preview upload"
			height="500"
			width="500"
			class="h-auto w-auto"
			sizes="100vw"
		/>
	</Dropzone>
	<Toggle name="toggle" bind:checked />

	<div>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua. Turpis egestas pretium aenean pharetra. Tempus imperdiet nulla
		malesuada pellentesque elit eget gravida cum. Purus in mollis nunc sed. Vel facilisis volutpat
		est velit. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Risus quis varius
		quam quisque. Nullam ac tortor vitae purus. Vel elit scelerisque mauris pellentesque pulvinar.
		Quam lacus suspendisse faucibus interdum posuere. Lectus magna fringilla urna porttitor rhoncus
		dolor purus non. Pretium lectus quam id leo in vitae. Augue interdum velit euismod in
		pellentesque massa placerat duis. Ante metus dictum at tempor. Proin libero nunc consequat
		interdum varius. Orci ac auctor augue mauris. Adipiscing commodo elit at imperdiet dui accumsan
		sit. Auctor urna nunc id cursus metus aliquam. Donec pretium vulputate sapien nec sagittis.
		Euismod quis viverra nibh cras pulvinar mattis nunc sed. Tempus quam pellentesque nec nam
		aliquam sem et tortor. Tristique sollicitudin nibh sit amet. Sollicitudin tempor id eu nisl.
		Mauris commodo quis imperdiet massa tincidunt nunc pulvinar. At augue eget arcu dictum. Gravida
		arcu ac tortor dignissim convallis aenean et tortor. Risus nec feugiat in fermentum posuere.
		Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. Gravida neque convallis
		a cras semper auctor neque. Ante metus dictum at tempor commodo ullamcorper. Sit amet aliquam id
		diam maecenas ultricies mi eget. Placerat duis ultricies lacus sed. Enim neque volutpat ac
		tincidunt vitae. Mauris cursus mattis molestie a iaculis at erat. Proin sagittis nisl rhoncus
		mattis. Proin libero nunc consequat interdum varius sit amet mattis. Vitae purus faucibus ornare
		suspendisse sed nisi lacus. Facilisis sed odio morbi quis commodo odio.
	</div>
	<div>
		In hendrerit gravida rutrum quisque non tellus. Mi tempus imperdiet nulla malesuada. Non nisi
		est sit amet facilisis. Egestas egestas fringilla phasellus faucibus. Sit amet facilisis magna
		etiam tempor orci. Eu scelerisque felis imperdiet proin fermentum leo. Odio morbi quis commodo
		odio aenean sed adipiscing diam. Nibh nisl condimentum id venenatis a condimentum vitae sapien.
		Ac odio tempor orci dapibus ultrices. Ut morbi tincidunt augue interdum velit euismod.
		Consectetur adipiscing elit duis tristique. Aenean euismod elementum nisi quis. At quis risus
		sed vulputate odio. Proin libero nunc consequat interdum varius. Euismod in pellentesque massa
		placerat duis ultricies lacus sed. Nibh ipsum consequat nisl vel. Interdum consectetur libero id
		faucibus nisl tincidunt. Etiam non quam lacus suspendisse. Ornare quam viverra orci sagittis eu
		volutpat. Malesuada fames ac turpis egestas. Arcu dictum varius duis at consectetur lorem. Risus
		nec feugiat in fermentum posuere urna nec tincidunt. Quisque sagittis purus sit amet volutpat
		consequat mauris. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Ut
		pharetra sit amet aliquam id. In metus vulputate eu scelerisque felis imperdiet proin fermentum
		leo. Lobortis scelerisque fermentum dui faucibus in ornare quam. Non sodales neque sodales ut
		etiam sit amet nisl purus. Quam id leo in vitae turpis massa. Quis viverra nibh cras pulvinar
		mattis nunc sed. Pretium lectus quam id leo in vitae turpis massa sed. Ultricies mi quis
		hendrerit dolor magna eget est lorem. Amet est placerat in egestas erat imperdiet sed euismod
		nisi. Accumsan lacus vel facilisis volutpat est velit egestas dui. Egestas purus viverra
		accumsan in nisl nisi. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim.
		Aliquam purus sit amet luctus. Ut etiam sit amet nisl purus in mollis nunc sed. Pulvinar
		pellentesque habitant morbi tristique senectus et netus.
	</div>

	<div>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua. Turpis egestas pretium aenean pharetra. Tempus imperdiet nulla
		malesuada pellentesque elit eget gravida cum. Purus in mollis nunc sed. Vel facilisis volutpat
		est velit. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Risus quis varius
		quam quisque. Nullam ac tortor vitae purus. Vel elit scelerisque mauris pellentesque pulvinar.
		Quam lacus suspendisse faucibus interdum posuere. Lectus magna fringilla urna porttitor rhoncus
		dolor purus non. Pretium lectus quam id leo in vitae. Augue interdum velit euismod in
		pellentesque massa placerat duis. Ante metus dictum at tempor. Proin libero nunc consequat
		interdum varius. Orci ac auctor augue mauris. Adipiscing commodo elit at imperdiet dui accumsan
		sit. Auctor urna nunc id cursus metus aliquam. Donec pretium vulputate sapien nec sagittis.
		Euismod quis viverra nibh cras pulvinar mattis nunc sed. Tempus quam pellentesque nec nam
		aliquam sem et tortor. Tristique sollicitudin nibh sit amet. Sollicitudin tempor id eu nisl.
		Mauris commodo quis imperdiet massa tincidunt nunc pulvinar. At augue eget arcu dictum. Gravida
		arcu ac tortor dignissim convallis aenean et tortor. Risus nec feugiat in fermentum posuere.
		Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. Gravida neque convallis
		a cras semper auctor neque. Ante metus dictum at tempor commodo ullamcorper. Sit amet aliquam id
		diam maecenas ultricies mi eget. Placerat duis ultricies lacus sed. Enim neque volutpat ac
		tincidunt vitae. Mauris cursus mattis molestie a iaculis at erat. Proin sagittis nisl rhoncus
		mattis. Proin libero nunc consequat interdum varius sit amet mattis. Vitae purus faucibus ornare
		suspendisse sed nisi lacus. Facilisis sed odio morbi quis commodo odio.
	</div>
	<div>
		In hendrerit gravida rutrum quisque non tellus. Mi tempus imperdiet nulla malesuada. Non nisi
		est sit amet facilisis. Egestas egestas fringilla phasellus faucibus. Sit amet facilisis magna
		etiam tempor orci. Eu scelerisque felis imperdiet proin fermentum leo. Odio morbi quis commodo
		odio aenean sed adipiscing diam. Nibh nisl condimentum id venenatis a condimentum vitae sapien.
		Ac odio tempor orci dapibus ultrices. Ut morbi tincidunt augue interdum velit euismod.
		Consectetur adipiscing elit duis tristique. Aenean euismod elementum nisi quis. At quis risus
		sed vulputate odio. Proin libero nunc consequat interdum varius. Euismod in pellentesque massa
		placerat duis ultricies lacus sed. Nibh ipsum consequat nisl vel. Interdum consectetur libero id
		faucibus nisl tincidunt. Etiam non quam lacus suspendisse. Ornare quam viverra orci sagittis eu
		volutpat. Malesuada fames ac turpis egestas. Arcu dictum varius duis at consectetur lorem. Risus
		nec feugiat in fermentum posuere urna nec tincidunt. Quisque sagittis purus sit amet volutpat
		consequat mauris. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Ut
		pharetra sit amet aliquam id. In metus vulputate eu scelerisque felis imperdiet proin fermentum
		leo. Lobortis scelerisque fermentum dui faucibus in ornare quam. Non sodales neque sodales ut
		etiam sit amet nisl purus. Quam id leo in vitae turpis massa. Quis viverra nibh cras pulvinar
		mattis nunc sed. Pretium lectus quam id leo in vitae turpis massa sed. Ultricies mi quis
		hendrerit dolor magna eget est lorem. Amet est placerat in egestas erat imperdiet sed euismod
		nisi. Accumsan lacus vel facilisis volutpat est velit egestas dui. Egestas purus viverra
		accumsan in nisl nisi. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim.
		Aliquam purus sit amet luctus. Ut etiam sit amet nisl purus in mollis nunc sed. Pulvinar
		pellentesque habitant morbi tristique senectus et netus.
	</div>
</main>
