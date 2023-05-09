import { Stack, Card, ButtonGroup, Button } from "react-bootstrap";
import { useShoppingCart } from "use-shopping-cart";

export function CartDetail() {
  const {
    cartDetails,
    removeItem,
    formattedTotalPrice,
    clearCart,
    redirectToCheckout,
    cartCount,
  } = useShoppingCart();

  return (
    <Stack gap={1}>
      {Object.entries(cartDetails).map(([priceId, detail]) => {
        return (
          <Card key={priceId}>
            <Card.Body>
              <Card.Title>{detail.name}</Card.Title>
              <Card.Text>
                {detail.formattedPrice} * {detail.quantity} ={" "}
                {detail.formattedValue} {detail.currency}
              </Card.Text>
              <ButtonGroup>
                <Button
                  variant="outline-danger"
                  onClick={() => removeItem(priceId)}
                >
                  削除
                </Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
        );
      })}
      <Card>
        <Card.Header>合計</Card.Header>
        <Card.Body>
          <Card.Title>{formattedTotalPrice}</Card.Title>
          <ButtonGroup>
            <Button
              variant="primary"
              disabled={cartCount < 1}
              onClick={async () => {
                try {
                  const result = await redirectToCheckout();
                  if (result.error) throw new Error(result.error);
                } catch (e) {
                  window.alert(e.message);
                }
              }}
            >
              注文する
            </Button>
            <Button variant="outline-danger" onClick={() => clearCart()}>
              カートを空にする
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    </Stack>
  );
}
