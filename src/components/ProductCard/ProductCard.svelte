<script>
	import { Badge, Button, Card, Rating } from 'flowbite-svelte';
</script>

<Card padding="none" class="flex-none">
    <a href="/">
      <img class="p-8 rounded-t-lg" src="https://www.continente.pt/dw/image/v2/BDVS_PRD/on/demandware.static/-/Sites-col-master-catalog/default/dw0bc5d91b/images/col/777/7775856-frente.jpg?sw=280&sh=280" alt="product 1" />
    </a>
    <div class="px-5 pb-5">
      <a href="/">
        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Crocante de Frango Cordon Bleu
        </h5>
      </a>
      <Rating rating="{4}" size="{24}" class="mt-2.5 mb-5">
        <Badge slot="text" class="ms-3">4</Badge>
      </Rating>
      <div class="flex justify-between items-center">
        <span class="text-3xl font-bold text-gray-900 dark:text-white">€599 - €750</span>
      </div>
    </div>
  </Card>