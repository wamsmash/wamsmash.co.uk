insert into products (
  product_code,
  product_type,
  slug,
  title,
  lane,
  base_price_pence,
  sale_price_pence,
  sale_enabled,
  sale_group,
  guest_visible,
  premium_visible,
  purchase_grants_premium_mode,
  website_streamable_after_purchase,
  direct_download_included,
  artwork_pack_included,
  lyric_sheet_included,
  collector_note_included,
  vault_only,
  active
)
values
  (
    'track_chaos',
    'track',
    'chaos',
    'CHAOS',
    'red',
    269,
    null,
    false,
    null,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
    true
  ),
  (
    'track_bonfire',
    'track',
    'bonfire',
    'BONFIRE',
    'blue',
    269,
    null,
    false,
    null,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
    true
  ),
  (
    'track_star',
    'track',
    'star',
    'STAR',
    'yellow',
    269,
    null,
    false,
    null,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
    true
  ),
  (
    'track_mary',
    'track',
    'mary',
    'MARY',
    'green',
    269,
    178,
    true,
    'rotating_promo',
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
    true
  ),
  (
    'track_edge',
    'track',
    'edge',
    'EDGE',
    'red',
    269,
    178,
    true,
    'rotating_promo',
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
    true
  ),
  (
    'track_jimmy',
    'track',
    'jimmy',
    'JIMMY',
    'blue',
    269,
    178,
    true,
    'rotating_promo',
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
    true
  ),
  (
    'vault_swim_edition_1',
    'vault_drop',
    'swim',
    'SWIM',
    'red',
    499,
    null,
    false,
    null,
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    true,
    true,
    true
  ),
  (
    'bundle_01',
    'bundle',
    'bundle-01',
    'Bundle 01',
    'mixed',
    500,
    null,
    false,
    null,
    true,
    true,
    true,
    false,
    true,
    true,
    false,
    true,
    true,
    true
  )
on conflict (product_code) do update
set
  product_type = excluded.product_type,
  slug = excluded.slug,
  title = excluded.title,
  lane = excluded.lane,
  base_price_pence = excluded.base_price_pence,
  sale_price_pence = excluded.sale_price_pence,
  sale_enabled = excluded.sale_enabled,
  sale_group = excluded.sale_group,
  guest_visible = excluded.guest_visible,
  premium_visible = excluded.premium_visible,
  purchase_grants_premium_mode = excluded.purchase_grants_premium_mode,
  website_streamable_after_purchase = excluded.website_streamable_after_purchase,
  direct_download_included = excluded.direct_download_included,
  artwork_pack_included = excluded.artwork_pack_included,
  lyric_sheet_included = excluded.lyric_sheet_included,
  collector_note_included = excluded.collector_note_included,
  vault_only = excluded.vault_only,
  active = excluded.active,
  updated_at = now();

insert into bundle_items (
  bundle_product_id,
  item_product_id,
  position
)
values
  (
    (select id from products where product_code = 'bundle_01'),
    (select id from products where product_code = 'track_chaos'),
    1
  ),
  (
    (select id from products where product_code = 'bundle_01'),
    (select id from products where product_code = 'track_star'),
    2
  ),
  (
    (select id from products where product_code = 'bundle_01'),
    (select id from products where product_code = 'track_bonfire'),
    3
  )
on conflict (bundle_product_id, item_product_id) do update
set
  position = excluded.position;

insert into promo_rules (
  promo_group,
  cadence_days,
  selection_mode,
  active_count,
  strike_price_pence,
  promo_price_pence
)
values (
  'rotating_promo',
  14,
  'random_from_pool',
  3,
  269,
  178
)
on conflict (promo_group) do update
set
  cadence_days = excluded.cadence_days,
  selection_mode = excluded.selection_mode,
  active_count = excluded.active_count,
  strike_price_pence = excluded.strike_price_pence,
  promo_price_pence = excluded.promo_price_pence,
  updated_at = now();

insert into promo_rule_items (
  promo_rule_id,
  product_id
)
values
  (
    (select id from promo_rules where promo_group = 'rotating_promo'),
    (select id from products where product_code = 'track_jimmy')
  ),
  (
    (select id from promo_rules where promo_group = 'rotating_promo'),
    (select id from products where product_code = 'track_edge')
  ),
  (
    (select id from promo_rules where promo_group = 'rotating_promo'),
    (select id from products where product_code = 'track_mary')
  )
on conflict (promo_rule_id, product_id) do nothing;
