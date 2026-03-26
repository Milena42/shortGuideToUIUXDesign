# Проблемы OKLCH

Осторожно: проблема. Да, вы можете задавать цвета через цифры, получая нужную светлоту. Вы можете даже генерировать эти цифры. Проблема в том, что в модели есть дырки. Можно наткнуться на недопустимое значение, и... да, браузер отобразит цвет, потому что пустоту отобразить невозможно. Но это будет не тот цвет, который вы имели в виду. У браузеров могут быть разные алгоритмы обрезки цвета до допустимого. Не факт, что сохранится та же светлота, насыщенность или тон. В общем, следите за вылетами из диапазона - вручную или при помощи библиотек, а то модель потеряет все свои преимущества и превратится в рандомайзер.

(Это не повод переходить на другие модели, OKLCH прекрасна - она отражает реальность, а реальность не ложится на идеальную форму, ее недостатки - прямое следствие ее преимуществ)

<div class="examples-2">
    <figure>
        <ColorModels3d colorSpace="oklab"/>
        <figcaption>OKLCH (OKLAB) - максимальная допустимая насыщенность зависит от светлоты и тона</figcaption>
    </figure>
    <figure>
        <ColorModels3d colorSpace="hsl"/>
        <figcaption>HSL - при известной светлоте известна максимальная насыщенность, от тона не зависит</figcaption>
    </figure>
</div>

## Примеры вылетов из диапазона

Вот 3D моделька типичного вылета, обратите внимание, что изменились светлота и даже тон:

<figure>
    <ColorModels3d colorSpace="oklab" wireframe :points="[{l:0.95,s:0.3,h:0},{l:0.95,s:0.026,h:0},{l:0.77,s:0.19,h:335}]" :size="300"/>
    <figcaption>oklch(0.95 0.3 0) - не существующий цвет, обрезан до oklch(0.77 0.19 335), а в дизайне хотелось бы oklch(0.95 0.026 0)</figcaption>
</figure>

Вот мы решили взять цвета, чтобы в столбиках был одинаковый тон, в строках - одинаковая светлота, а насыщенность везде одинаковая (серый справа для сравнения светлоты):

<OklchProblemDemo lightness="0.95" chroma="0.3" showGray/>
<OklchProblemDemo lightness="0.5" chroma="0.3" showGray whiteText/>
<OklchProblemDemo lightness="0.14" chroma="0.3" showGray whiteText/>

Не похоже? Можете посмотреть в CSS коды oklch, там действительно указаны одинаковые цифры.

Если у нас в приоритете именно светлота, и при вылете мы уменьшаем насыщенность (как это обычно в дизайне), то это должно было выглядеть, например, так:

<div class="oklch-problem-demo-palette">
    <OklchDiv l="0.95" c="0.026" h="0" />
    <OklchDiv l="0.95" c="0.116" h="130" />
    <OklchDiv l="0.95" c="0.02" h="260" />
    <OklchDiv l="0.95" c="0" h="0" />
</div>
<div class="oklch-problem-demo-palette color-white">
    <OklchDiv l="0.5" c="0.2" h="0" />
    <OklchDiv l="0.5" c="0.13" h="130" />
    <OklchDiv l="0.5" c="0.2" h="260" />
    <OklchDiv l="0.5" c="0" h="0" />
</div>
<div class="oklch-problem-demo-palette color-white">
    <OklchDiv l="0.14" c="0.05" h="0" />
    <OklchDiv l="0.14" c="0.035" h="130" />
    <OklchDiv l="0.14" c="0.057" h="260" />
    <OklchDiv l="0.14" c="0" h="0" />
</div>

То же самое на 3D графиках:

<div class="examples-2">
    <figure>
        <ColorModels3d colorSpace="oklab" wireframe :points="[{l:0.95,s:0.3,h:0},{l:0.5,s:0.3,h:0},{l:0.14,s:0.3,h:0},{l:0.95,s:0.3,h:130},{l:0.5,s:0.3,h:130},{l:0.14,s:0.3,h:130},{l:0.95,s:0.3,h:260},{l:0.5,s:0.3,h:260},{l:0.14,s:0.3,h:260},{l:0.95,s:0,h:0},{l:0.5,s:0,h:0},{l:0.14,s:0,h:0},]" :size="250"/>
        <figcaption>куда точки вылетели</figcaption>
    </figure>
    <figure>
        <ColorModels3d colorSpace="oklab" wireframe :points="[
            {l:0.77,s:0.2,h:335},{l:0.55,s:0.22,h:7},{l:0.25,s:0.1,h:25},
            {l:0.9,s:0.24,h:130},{l:0.5,s:0.17,h:141},{l:0.16,s:0.046,h:142},
            {l:0.85,s:0.12,h:214},{l:0.5,s:0.27,h:264},{l:0.3,s:0.186,h:278},
            {l:0.95,s:0,h:0},{l:0.5,s:0,h:0},{l:0.14,s:0,h:0},
        ]" :size="250"/>
        <figcaption>куда точки попали в результате обрезки</figcaption>
    </figure>
</div>

<figure>
    <ColorModels3d colorSpace="oklab" wireframe :points="[{l:0.95,s:0.026,h:0},{l:0.5,s:0.2,h:0},{l:0.14,s:0.05,h:0},{l:0.95,s:0.116,h:130},{l:0.5,s:0.13,h:130},{l:0.14,s:0.035,h:130},{l:0.95,s:0.02,h:260},{l:0.5,s:0.2,h:260},{l:0.14,s:0.057,h:260},{l:0.95,s:0,h:0},{l:0.5,s:0,h:0},{l:0.14,s:0,h:0},]" :size="250"/>
    <figcaption>куда мы хотели бы поместить точки (каждая строка в одной плоскости и каждый столбец в одной плоскости)</figcaption>
</figure>

А вот одинаковая светлота, и мы постепенно увеличиваем насыщенность:

<OklchProblemDemo lightness="0.15" chroma="0"  whiteText/>
<OklchProblemDemo lightness="0.15" chroma="0.1"  whiteText/>
<OklchProblemDemo lightness="0.15" chroma="0.2"  whiteText/>
<OklchProblemDemo lightness="0.15" chroma="0.3"  whiteText/>

Некоторые стали еще и светлее - и это проблема.

### С более спокойными цветами

(пишут же, что до 0.15 насыщенность более-менее безопасна)

Во второй строке увеличили насыщенность, сохраняя светлоту:
<OklchProblemDemo lightness="0.9" chroma="0.03"/>
<OklchProblemDemo lightness="0.9" chroma="0.13"/>

Вам не кажется, что розовый во второй строке какой-то темный? Можете нажать F12 и проверить, в CSS действительно указана одинаковая светлота.

Еще 2 строки, на этот раз они выглядят одинаково (если у вас не одинаково, браузеры внедрили новый алгоритм, наконец-то):
<OklchProblemDemo lightness="0.9" chroma="0.13"/>

<div class="oklch-problem-demo-palette">
    <OklchDiv l="0.8598" c="0.0905" h="349.31" />
    <OklchDiv l="0.9007" c="0.1307" h="130.3" />
    <OklchDiv l="0.8784" c="0.0695" h="235.62" />
</div>

В первой строке - то, что в прошлом примере. Вторая строка получена путем копирования отображаемого rgb пипеткой и перевода обратно в oklch сайтом-конвертером.
Зеленый цвет в данном примере - существующий. Остальные выпали из диапазона и были обрезаны. Последняя циферка и у зеленого отличается - это, допустим, нормально, погрешность при вычислениях. А вот у полученных красного и синего заметно уменьшилась светлота - это могло сломать контрастность. Тон тоже поменялся. Чтобы увидеть, что светлота отличается, вот строки с полученными значениями светлоты, светлеет к низу:

<div class="oklch-problem-demo-palette">
    <OklchDiv l="0.8598" c="0.0903" h="349.31" />
    <OklchDiv l="0.8598" c="0.1307" h="130.3" />
    <OklchDiv l="0.8598" c="0.0805" h="235.62" />
</div>
<div class="oklch-problem-demo-palette">
    <OklchDiv l="0.8784" c="0.0761" h="349.31" />
    <OklchDiv l="0.8784" c="0.1307" h="130.3" />
    <OklchDiv l="0.8784" c="0.0685" h="235.62" />
</div>
<div class="oklch-problem-demo-palette">
    <OklchDiv l="0.9007" c="0.0609" h="349.31" />
    <OklchDiv l="0.9007" c="0.1307" h="130.3" />
    <OklchDiv l="0.9007" c="0.0555" h="235.62" />
</div>

### Как это могло сломать контрастность

Попробуем использовать эти цвета для текста (L = 0.9, C = 0.13):

<div style="background-color: #616161" class="oklch-problem-demo-palette">
    <p style="color: oklch(0.9 0.03 0)">Типа текст</p>
    <p style="color: oklch(0.9 0.03 130)">Типа текст</p>
    <p style="color: oklch(0.9 0.03 260)">Типа текст</p>
</div>
<div style="background-color: #616161" class="oklch-problem-demo-palette">
    <p style="color: oklch(0.9 0.13 0)">Типа текст</p>
    <p style="color: oklch(0.9 0.13 130)">Типа текст</p>
    <p style="color: oklch(0.9 0.13 260)">Типа текст</p>
</div>

Тут верхняя строка и зеленый проходят проверку на контрастность (граничное значение, но допустимо). А розовый и синий - нет. Хотя с сохранением светлоты должны были.

По-моему, контрастность - самое главное в дизайне, и при вылетах надо, сохраняя светлоту и тон, уменьшить насыщенность до максимальной существующей:
<OklchProblemDemo lightness="0.9" chroma="0.03"/>

<div class="oklch-problem-demo-palette">
    <OklchDiv l="0.9" c="0.055" h="0" />
    <OklchDiv l="0.9" c="0.13" h="130" />
    <OklchDiv l="0.9" c="0.047" h="260" />
</div>

Теперь контрастность проходит:

<div style="background-color: #616161" class="oklch-problem-demo-palette">
    <p style="color: oklch(0.9 0.03 0)">Типа текст</p>
    <p style="color: oklch(0.9 0.03 130)">Типа текст</p>
    <p style="color: oklch(0.9 0.03 260)">Типа текст</p>
</div>
<div style="background-color: #616161" class="oklch-problem-demo-palette">
    <p style="color: oklch(0.9 0.055 0)">Типа текст</p>
    <p style="color: oklch(0.9 0.13 130)">Типа текст</p>
    <p style="color: oklch(0.9 0.047 260)">Типа текст</p>
</div>

К сожалению, это приходится делать вручную или через библиотеки (например, в chroma.js можно проверять цвет на существование функцией [clipped](https://gka.github.io/chroma.js/#color-clipped))

<script setup lang="ts">
    import OklchProblemDemo from '/examples/OklchProblemDemo.vue';
    import OklchDiv from '/examples/OklchDiv.vue';
    import ColorModels3d from '/examples/ColorModels3d.vue';
</script>
