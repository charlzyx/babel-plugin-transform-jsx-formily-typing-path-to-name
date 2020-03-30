/* eslint-disable */
const Playground = () => {
  const data = {

  };

  return (
    <Form typing={data}>

<Field
          type="string"
          path={search.productName}
          title="商品名称"
          x-component="Input"
        />
        <Field
          type="string"
          path={search.productNo}
          title="商品代码"
          x-component="Input"
        />
        <Field
          type="string"
          enum={cdict.optionsWithAll}
          path={search.categoryId}
          title="商品分类"
          x-component="Select"
        />
        <Field
          type="number"
          enum={dict.status.options}
          title="是否上架"
          path="status"
          default={dict.status.emap['全部']}
          x-component="Radio"
        />
    </Form>
  );
};
