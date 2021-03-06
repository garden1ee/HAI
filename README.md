## ImageHackers

### Project Summary
![eyecatcher](https://i.imgur.com/hENAd4y.png)

A black-box inpainting AI can ignore user intention without explanation, harming the user experience.
To solve the problem, we injected a backdoor to a trained black-box AI and connected it to an intuitive coloring UI.
Our approach allows a joint understanding & control of the inpainting process, and is fully unsupervised, unlike most of the interactive AI.

<div style="text-align:center">
<img src="https://i.imgur.com/s6Zf2T6.png" height="200"/>
</div>

Our framework supports three main types of interactions:
* AI-driven inpainting of an image's masked regions
* Visualization of AI decision via color-coded attention map
* Modulation of AI decision via painting UI

The second and third user interactions are realized with a unified, colored map representation of the model attention.
This is our novel and unique approach.
This is link for prototype: [KVPN required](http://143.248.133.65:4321/#).

### Instruction

<div style="text-align:center">
<img src="https://i.imgur.com/YRM1Y3H.png" width="400"/>
<img src="https://i.imgur.com/0pbDCKH.png" width="400"/>
</div>

In this section, we will further demonstrate how the above image can be inpainted to produce the bottom image.

1. Upload an image.
<div style="text-align:center">
<img src="https://i.imgur.com/x5I95I1.jpg" width="500"/>
</div>

2. Press `Next Step` and add masks. You can try both square & free-form masks, but we recommend non-overlapping squares because underlying AI is trained that way.
<div style="text-align:center">
<img src="https://i.imgur.com/FmXkPha.png" width="500"/>
</div>

3. Press `Next Step`. An inpainted result by the AI will show up. You can stop here if you are satisfied.
<div style="text-align:center">
<img src="https://i.imgur.com/0MOJzHq.jpg" width="500"/>
</div>

4. If you want to *understand*, press `Modulate`. A colored map will be shown on top of the masks. *The colored map denotes where the AI looks at*. Specifically, each color denotes a position of a source pixel where the AI can draw information from. The *palatte* in the bottom-right corner provides the position-color mappings. For example, you can see the pink dots in the center of attention, and notice that inpainted image is having noise in that area. By comparing with color map, you can *understand* that AI is giving attention on bottom-left area(possiblly grass or sunflower) for that point, causing noise to appear.
<div style="text-align:center">
<img src="https://i.imgur.com/SOrkxIk.jpg" width="500"/>
</div>

5. You might want to change the inpainting result. We provide *painting tools* for that. These are similar to a conventional painter, except that the palette is the image itself. For example, in the below picture, I used the color picker to select a region containing a sunflower. In the bottom-right palette, you can see that the region corresponds to pink and red colors.
<div style="text-align:center">
<img src="https://i.imgur.com/gNRcQU6.png" width="500"/>
</div>

6. After picking, you can *color the mask*. This will make the AI draw information from selected color (region) to fill-in the mask. In the below example, I intended the AI to use the sunflower (pink and red colors).
<div style="text-align:center">
<img src="https://i.imgur.com/btQtWNE.png" width="500"/>
</div>

7. If you are done, press `Convert`. A modified inpainting result will show up.
<div style="text-align:center">
<img src="https://i.imgur.com/itBcCfI.jpg" width="500"/>
</div>

8. You can still press `Modulate` to keep on modulating. In the above example, I didn't like the subtle degradation around the sunflower, so I decided to color the region with clouds (yellow and blue colors).
<div style="text-align:center">
<img src="https://i.imgur.com/QFehly1.png" width="500"/>
</div>
<div style="text-align:center">
<img src="https://i.imgur.com/ntFeVDU.jpg" width="500"/>
</div>

9. If you are satisfied, you can press `Next step`, and download the image or start again from the beginning.
<div style="text-align:center">
<img src="https://i.imgur.com/mfTQ9x7.jpg" width="500"/>
</div>

### Implementation

Dependencies: `python` and `virtualenv`.
Every required packages are listed in `engine/requirements.txt`.


Web:
* [Flask](https://palletsprojects.com/p/flask/) (Web)
* [jQuery](https://jquery.com/)
* [Sammy.js](http://sammyjs.org/) (Router)
* [HTML5 Canvas](https://developer.mozilla.org/ko/docs/Web/HTML/Canvas)
* [Fontawesome](https://fontawesome.com/)

Model:
* [DeepFillv1](https://github.com/JiahuiYu/generative_inpainting/tree/v1.0.0): JiaHui et al., Generative Image Inpainting with Contextual Attention, CVPR (2018) [[arXiv]](https://arxiv.org/abs/1801.07892)
* [TenserFlow](https://www.tensorflow.org/?hl=ko)
* [Matplotlib](https://matplotlib.org/)
* [OpenCV](https://opencv.org/)
* [scikit-learn](https://scikit-learn.org/)
* [Jupyter](https://jupyter.org/)
