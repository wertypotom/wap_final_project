import React, { useState, useCallback, useMemo } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Spinner, Button } from '../ui';
import { ReviewItem } from '../components/ReviewItem';
import { ReviewModal } from './ReviewModal';
import type { IReview } from '../types';
import { deleteReview } from '../services/reviewService';
import { useToastStore } from '../stores/useToastStore';

interface Props {
  productId: string;
  reviews: IReview[];
  loading: boolean;
  refetch: () => void;
}

export const ReviewList: React.FC<Props> = React.memo(
  ({ productId, reviews, loading, refetch }) => {
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<IReview | null>(null);
    const addToast = useToastStore((s) => s.addToast);

    const handleDelete = useCallback(
      async (id: string) => {
        try {
          await deleteReview(productId, id);
          addToast('Review deleted', 'success');
          refetch();
        } catch {
          addToast('Failed to delete review', 'danger');
        }
      },
      [productId, refetch, addToast]
    );

    const reviewItems = useMemo(() => {
      return reviews.map((r) => (
        <ReviewItem
          key={r.id}
          {...r}
          onEdit={() => {
            setEditing(r);
            setShowModal(true);
          }}
          onDelete={() => handleDelete(r.id)}
        />
      ));
    }, [reviews, handleDelete]);

    return (
      <>
        <Button onClick={() => setShowModal(true)} className="mb-3">
          Add Review
        </Button>

        {loading ? (
          <Spinner />
        ) : reviews.length === 0 ? (
          <p className="text-center">No reviews yet. Be the first!</p>
        ) : (
          <ListGroup>{reviewItems}</ListGroup>
        )}

        <ReviewModal
          show={showModal}
          review={editing ?? undefined}
          productId={productId}
          onHide={() => {
            setShowModal(false);
            setEditing(null);
            refetch();
          }}
        />
      </>
    );
  }
);
