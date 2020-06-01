import { useState, useEffect } from "haunted";
export default async function (store, apis) {
  function useCartForm(cart_json, cart_is_updating, old_cart_json) {
    const cart = JSON.parse(cart_json);
    const old_cart = JSON.parse(old_cart_json ? old_cart_json : null);
    useEffect(
      function () {
        if (cart_is_updating === null && cart_json === old_cart_json) {
          document.querySelectorAll('input[name="updates[]"]').forEach((el) => {
            el.value = el.getAttribute("value");
          });
        }
      },
      [cart_json, cart_is_updating, old_cart_json]
    );
    const onUpdateButtonClicked = (e) => {
      e.preventDefault();
      store.dispatch(
        "updateCartFromForm",
        e.target.closest("form[action='/cart']")
      );
    };

    const onRemoveLinkClicked = (e) => {
      e.preventDefault();
      store.dispatch(
        "removeItemByLine",
        e.target.closest("[data-line]").dataset.line
      );
    };

    const onQuantityInputChanged = (e) => {
      e.preventDefault();
      store.dispatch("changeItemByKey", {
        key: e.target.dataset.key,
        quantity: e.target.value,
      });
    };

    return [
      cart,
      old_cart,
      {
        onQuantityInputChanged,
        onRemoveLinkClicked,
        onUpdateButtonClicked,
      },
    ];
  }
  function useATCForm(product_handle) {
    const [currentVariant, setCurrentVariant] = useState(null);
    const [product, setProduct] = useState(null);
    const [options, setOptions] = useState(null);
    useEffect(() => {
      apis
        .getProduct({ view: "theme", handle: product_handle })
        .then((rawProduct) => {
          const currentVariantId = rawProduct.selected_variant_id
            ? rawProduct.selected_variant_id
            : rawProduct.first_available_variant_id
            ? rawProduct.first_available_variant_id
            : null;
          const tmpCurrentVariant = !currentVariantId
            ? null
            : rawProduct.variants.find(
                (variant) => variant.id === currentVariantId
              );
          const tmpOptions = rawProduct.options_with_values;
          delete rawProduct["selected_variant_id"];
          delete rawProduct["first_available_variant_id"];

          setProduct(rawProduct);
          setCurrentVariant(tmpCurrentVariant);
          setOptions(tmpOptions);
        });
    }, [product_handle]);

    const onATCButtonClicked = (e) => {
      e.preventDefault();
      store.dispatch(
        "addItemFromForm",
        e.target.closest("form[action='/cart/add']")
      );
    };

    function onOptionChanged(e) {
      const variantOptionValues = {
        option1: currentVariant.option1,
        option2: currentVariant.option2,
        option3: currentVariant.option3,
        [e.target.dataset.optionPosition]: e.target.value,
      };
      const tmpVariant = product.variants.find(
        (variant) =>
          variant.option1 === variantOptionValues.option1 &&
          variant.option2 === variantOptionValues.option2 &&
          variant.option3 === variantOptionValues.option3
      );
      setCurrentVariant(tmpVariant);
    }

    return [
      product,
      currentVariant,
      options,
      {
        onATCButtonClicked,
        onOptionChanged,
      },
    ];
  }
  function useProductGridItem(product_handle) {
    const [currentVariant, setCurrentVariant] = useState(null);
    const [product, setProduct] = useState(null);
    const [options, setOptions] = useState(null);
    useEffect(() => {
      apis
        .getProduct({
          view: "theme",
          handle: product_handle,
        })
        .then((rawProduct) => {
          const currentVariantId = rawProduct.selected_variant_id
            ? rawProduct.selected_variant_id
            : rawProduct.first_available_variant_id
            ? rawProduct.first_available_variant_id
            : null;
          const tmpCurrentVariant = !currentVariantId
            ? null
            : rawProduct.variants.find(
                (variant) => variant.id === currentVariantId
              );
          const tmpOptions = rawProduct.options_with_values;
          delete rawProduct["selected_variant_id"];
          delete rawProduct["first_available_variant_id"];

          setProduct(rawProduct);
          setCurrentVariant(tmpCurrentVariant);
          setOptions(tmpOptions);
        });
    }, [product_handle]);

    const onATCButtonClicked = (e) => {
      e.preventDefault();
      store.dispatch(
        "addItemFromForm",
        e.target.closest("form[action='/cart/add']")
      );
    };

    function onOptionChanged(e) {
      const variantOptionValues = {
        option1: currentVariant.option1,
        option2: currentVariant.option2,
        option3: currentVariant.option3,
        [e.target.dataset.optionPosition]: e.target.value,
      };
      const tmpVariant = product.variants.find(
        (variant) =>
          variant.option1 === variantOptionValues.option1 &&
          variant.option2 === variantOptionValues.option2 &&
          variant.option3 === variantOptionValues.option3
      );
      setCurrentVariant(tmpVariant);
    }

    return [
      product,
      currentVariant,
      options,
      {
        onATCButtonClicked,
        onOptionChanged,
      },
    ];
  }
  function useCollectionTagsFilter(current_tags, all_tags, tags) {
    current_tags =
      !current_tags || current_tags === true ? [] : current_tags.split("+");
    all_tags = !all_tags || all_tags === true ? [] : all_tags.split(",");
    tags = !tags || tags === true ? [] : tags.split(",");
    const onCurrentTagsChanged = function (e) {
      store.dispatch("changeCollectionCurrentTags", e.target.value);
    };
    return [current_tags, all_tags, tags, { onCurrentTagsChanged }];
  }
  function useCollectionSortByController(sort_options) {
    sort_options = JSON.parse(sort_options ? sort_options : null);
    const onSortByChanged = function (e) {
      store.dispatch("changeCollectionSortBy", e.target.value);
    };
    return [sort_options, { onSortByChanged }];
  }
  return {
    useState,
    useEffect,
    useCartForm,
    useATCForm,
    useCollectionTagsFilter,
    useCollectionSortByController,
    useProductGridItem,
  };
}
