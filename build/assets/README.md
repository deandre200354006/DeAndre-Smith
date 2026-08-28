# Product photo override

Drop transparent-background PNG cutouts here to replace the vector stand-in:

- `product.png`        the Upsy frame alone
- `product-child.png`  the frame with a child standing in it (optional)

Then run `npm run build`. The renderer scales each file into the same 400×540 local
box the layouts already position, so floor lines, shadows and relative scale carry
over unchanged.

If you supply `product-child.png`, remember the brief's rule: any image with a child
in it must also show an attending adult. The illustrated child is replaced wholesale
by your file, so check each render.
